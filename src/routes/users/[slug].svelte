<script context="module">
	export async function load (ctx)	{
		let slug = ctx.page.params.slug;
		return { props: {slug}};
	}
</script>
<script>
	import { onMount } from 'svelte';
	import { cat } from '../storage.js';
	import { HEXtoRGB } from './components/hextorgb.js';
	import { rankifier } from './components/rankifier.js';
	import { HSVtoRGB } from './components/hsvtorgb.js';
	import Charts from "./components/charts.svelte";
	
	export let slug;

	let user, forum, custom;
	let headColor = "var(--accent)";
	let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	async function getData()    {
		await fetch(`https://scratchdb.lefty.one/v3/user/info/${slug}`)
        .then(res => res.json())
        .then(data => {
            user = data;
        })
        await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${slug}/`)
        .then(res => res.json())
        .then(data => {
            forum = data;
        })
		await fetch(`https://my-ocular.jeffalo.net/api/user/${slug}`)
        .then(res => res.json())
        .then(data => {
            custom = data;
			headColor = custom.color;
        })
    }
    let promise = getData();
    onMount(async() => {
        promise = getData();
    })
</script>

<svelte:head>
	{#if user}
		<title>{slug} - postpercent</title>
	{:else}
		<title>Loading user {slug}</title> 
	{/if}
</svelte:head>

<header style="background-color:{headColor};">
	<ul class="pfp-container">
		<li class="pfp">
			{#if user}
			<a href="/users/{user.username}"><img src="https://cdn2.scratch.mit.edu/get_image/user/{user.id}_150x150.png" alt={slug}></a>
			{:else}
			<a href="/users/{slug}"><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></a>
			{/if}
		</li>
	</ul>
	<ul class="info-container">
		<li class="username">
			<a href="/users/{slug}"><nobr>{slug}</nobr></a>
		</li>
		<li class="status">
			{#if custom}
				{custom.status}
			{:else}
				Getting status...
			{/if}
		</li>
		<ul class="posts-container">
			<ul class="total-post-container">
				<li class="total-posts-header">Total Posts</li>
				{#if forum}
					<li class="total-posts">{forum.counts.total.count}</li>
				{/if}
			</ul>
			<ul class="rank-container">
				<li class="ranking-header">Rank</li>
				{#if forum}
					<li class="ranking">{rankifier(forum.counts.total.rank)}</li>
				{/if}
			</ul>
		</ul>
		<ul class="misc-container">
			<li class="first-posted">
				{#if forum}
					<nobr>{monthList[new Date(forum.firstSeen.date).getMonth()]} {rankifier(new Date(forum.firstSeen.date).getDate())}, {new Date(forum.firstSeen.date).getFullYear()}</nobr>
				{/if}
			</li>
			<li class="last-posted">
				{#if forum}
					<nobr>{monthList[new Date(forum.lastSeen.date).getMonth()]} {rankifier(new Date(forum.lastSeen.date).getDate())}, {new Date(forum.lastSeen.date).getFullYear()}</nobr>
				{/if}
			</li>
			<li class="scratch-link">
				<a href="https:/scratch.mit.edu/users/{slug}">scratch</a>
			</li>
			<li class="ocular-link">
				<a href="https://ocular.jeffalo.net/user/{slug}">ocular</a>
			</li>
		</ul>
	</ul>
</header>
<main>
	{#await promise}
	<img src="../../static/loading.gif" alt="Loading" class="loading">
	{:then}
	<div class="post-dist-container">
		{#each Object.entries(forum.counts) as i}
			{#if i[0] != `total`}
				<div class="post-dist-bar" style="background-color: rgb({Math.random()*100},{Math.random()*100},{Math.random()*100}); order: {i[1].count * -1}">
					<li><a href="../" on:click={cat.set(i[0])}>{i[0]}</a></li>
					<ul>
						<li>{i[1].count}</li>
						<li>{rankifier(i[1].rank)}</li>
						<li>{Math.round(i[1].count / forum.counts.total.count * 10000)/100}%</li>
					</ul>
				</div>
			{/if}
		{/each}
	</div>
	<br>
	{:catch}
	something broke
	{/await}
	{#if custom}	
	<Charts username={slug} color={custom.color}></Charts>
	{/if}
	<br>
</main>

<style>
	header	{
        background-color: var(--accent);
        display: flex;
        justify-content: space-between;
        padding: 0 4%;
		transition: background-color 1s;
		position: sticky;
		top: calc(3em + 1.5px);
    }
	header ul	{
        display: flex;
        flex-direction: row;
        width: 50%;
        padding: 0;
        align-items: flex-end;
    }
	header ul li	{
        text-decoration: none;
        list-style: none;
        margin: 0 10px;
    }
	.info-container > li:first-child	{
		margin-bottom: auto;
	}
	.pfp-container	{
		justify-content: flex-start;
		user-select: none;
	}
	.misc-container, .info-container	{
		justify-content: flex-end;
	}
	.posts-container, .pfp-container	{
		flex-direction: row;
	}
	.total-post-container, .rank-container, .info-container	{
		flex-direction: column;
	}

	.username, .ranking, .total-posts	{
        font-size: 32px;
        font-weight: bold;
    }
	.status	{
		margin-bottom: 12px;
	}
	.total-posts-header, .ranking-header	{
		font-weight: bold;
	}

	main   {
        padding: 10px calc(4% + 10px);
    }
	.pfp img	{
		width: 150px;
		height: 150px;
	}
	.post-dist-container	{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		margin: auto;
	}
	.post-dist-bar	{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 25%;
		user-select: none;
	}
	@media only screen and (max-width: 1200px)   {
        .post-dist-bar    {
            width: 50%;
        }
    }
	.post-dist-bar ul	{
		text-align: right;
		padding: 0;
		margin: 0;
	}
	.post-dist-bar li	{
		text-decoration: none;
        list-style: none;
	}
	.post-dist-bar > li	{
		padding-left: 3px;
	}
	.post-dist-bar li	{
		padding-right: 3px;
		margin: 3px 0;
	}
	.post-dist-bar li:first-child	{
		font-weight: bold;
	}
</style>