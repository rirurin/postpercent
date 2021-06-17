<script context="module">
	export async function load (ctx)	{
		let slug = ctx.page.params.slug;
		return { props: {slug}};
	}
</script>
<script>
	import { onMount } from 'svelte';
	import { cat, highlight } from '../storage.js';
	import { HEXtoRGB } from '../lib/hextorgb.js';
	import { rankifier } from '../lib/rankifier.js';
	import { HSVtoRGB } from '../lib/hsvtorgb.js';

	import Charts from "../lib/charts.svelte";
	import Header from "../lib/header.svelte";
	
	export let slug;

	let username = slug;
	let user, forum, custom;
	let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let lightText = 0;
	let pieColors = [];

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
			if (forum.error == "UserNotFoundError")	{
				forum = {"counts":{"total":{"count":0,"rank":0}}, "firstSeen":{"date":"2000-01-01T00:00:00.000Z","id":0},"lastSeen":{"date":"2000-01-01T00:00:00.000Z","id":0}}
			} else	{
				for (let i = 1; i < Object.keys(forum.counts).length - 1; i++)	{
					pieColors.push(`rgb(${Math.random()*100},${Math.random()*100},${Math.random()*100})`)
				}
			}
        })
		await fetch(`https://my-ocular.jeffalo.net/api/user/${slug}`)
        .then(res => res.json())
        .then(data => {
            custom = data;
			if (custom.color)   {
				highlight.set(custom.color);
                const contraster = [];
                contraster.push(HEXtoRGB(custom.color).r); contraster.push(HEXtoRGB(custom.color).g); contraster.push(HEXtoRGB(custom.color).b);
                const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);
				brightness > 150 ? lightText = 1 : lightText = 0;
            } else	{
				highlight.set(`var(--accent)`);
			}
        })
    }
    let promise = getData();
    onMount(async() => {
        // promise = getData();
    })

	$: if (username !== slug)	{
		username = slug;
		promise = getData();
	}
</script>

<svelte:head>
	{#await promise}
	<title>Loading user {slug}</title> 
	{:then} 
	<title>{slug} - postpercent</title>
	{:catch}
	<title>Error loading user {slug}</title>
	{/await}
</svelte:head>
	<header style="background-color:{$highlight}; color:{lightText == 1 ? `#1c1c1c`: `#ffffff`}" class="main-header">
		<ul class="pfp-container">
			<li class="pfp">
				{#if user}
				<a href="/users/{user.username}"><img src="https://uploads.scratch.mit.edu/users/avatars/{user.id}.png" alt={slug}></a>
				{:else}
				<a href="/users/{slug}"><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></a>
				{/if}
			</li>
		</ul>
		<ul class="info-container">
			<li class="username">
				{#if user}
				<a href="/users/{user.username}"><nobr>{user.username}</nobr></a>
				{:else}
				<a href="/users/{slug}"><nobr>{slug}</nobr></a>
				{/if}
			</li>
			<li class="status">
				{#if custom}
					{#if custom.error == "no user found"}
						No Ocular status found
					{:else}
						{custom.status}
					{/if}
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
						{new Date(forum.firstSeen.date).toLocaleString('en-US')}
					{/if}
				</li>
				<li class="last-posted">
					{#if forum}
						{new Date(forum.lastSeen.date).toLocaleString('en-US')}
					{/if}
				</li>
			</ul>
			<ul class="misc-container">
				<li><nobr>View user on:</nobr></li>
				<li class="scratch-link">
					<a href="https://scratch.mit.edu/users/{slug}">scratch <span class="iconify header-external-icon" data-icon="heroicons-solid:external-link" data-inline="false"></span></a>
				</li>
				<li class="ocular-link">
					<a href="https://ocular.jeffalo.net/user/{slug}">ocular <span class="iconify header-external-icon" data-icon="heroicons-solid:external-link" data-inline="false"></span></a>
				</li>
			</ul>
		</ul>
	</header>

<header style="background-color:{$highlight}; color:{lightText == 1 ? `#1c1c1c`: `#ffffff`}" class="sticky-header">
	<li class="sticky-pfp">
		{#if user}
		<a href="/users/{user.username}"><img src="https://cdn2.scratch.mit.edu/get_image/user/{user.id}_150x150.png" alt={slug}></a>
		{:else}
		<a href="/users/{slug}"><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></a>
		{/if}
	</li>
	<li class="sticky-username">
		{#if user}
		<a href="/users/{user.username}"><nobr>{user.username}</nobr></a>
		{:else}
		<a href="/users/{slug}"><nobr>{slug}</nobr></a>
		{/if}
	</li>
</header>
<div id="compensator"></div>
<main>
	{#await promise}
	<img src="/loading.gif" alt="Loading" class="loading" style="filter: brightness(100)">
	{:then}
	<div class="post-dist-container">
		{#each Object.entries(forum.counts) as i, j}
			{#if i[0] != `total`}
				<div class="post-dist-bar" style="background-color: {pieColors[j - 1]}; order: {i[1].count * -1}">
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
	<Charts username={slug} color={custom.color ? custom.color : `#f54260`} colors={pieColors}></Charts>
	{:catch}
	bruh<br>
	no posts
	{/await}
	<br>
</main>

<style>
	header	{
        display: flex;
        justify-content: space-between;
        padding: 0 4%;
		transition: background-color 1s, color 1s;
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
		align-items: center;
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

	.username, .sticky-username, .ranking, .total-posts	{
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
		width: 170px;
		height: 170px;
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
	.misc-container li, .total-posts-header, .scratch-link, .ocular-link	{
		white-space: nowrap;
	}
	.total-post-container	{
		text-align: right;
	}
	.main-header	{
		position: absolute;
		width: calc(92%);
		z-index: 1;
	}
	.sticky-header	{
		list-style: none;
		text-decoration: none;
		position: sticky;
		top: calc(3em + 1px);
		padding: 5px calc(4% + 10px);
		align-items: center;
		z-index: 0;
	}
	.sticky-pfp img	{
		width: 3em;
		height: 3em;
	}
	#compensator	{
		height: 170px;
	}
	@media only screen and (max-width: 720px)   {
        .username, .ranking, .total-posts	{
			font-size: inherit;
			font-weight: bold;
    	}
		.info-container	{
			flex-direction: row;
			flex-wrap: wrap;
			align-items: flex-start;
			width: 100%;
		}
		.pfp img	{
			width: 90px;
			height: 90px;
		}
		.pfp-container	{
			align-items: flex-start;
		}
		.misc-container li, .total-posts-header	{
			white-space: normal;
		}
		.misc-container	{
			width: 100%;
		}
		.header-external-icon	{
			display: none;
		}
		.scratch-link, .ocular-link	{
			text-decoration: underline;
		}
		.total-post-container, .rank-container	{
			flex-direction: row;
			justify-content: flex-end;
		}
		.posts-container	{
			flex-direction: row;
			width: 100%;
		}
		header, .sticky-header	{
			top: calc(5em + 8px);
		}
		#compensator	{
			height: 100px;
		}
    }
	@media only screen and (max-width: 400px)   {
		.pfp-container	{
			display: none;
		}
		.post-dist-bar    {
            width: 100%;
        }
		.info-container, .posts-container, .misc-container, .total-post-container, .rank-container	{
			justify-content: center;
			text-align: center;
		}
		header, .sticky-header	{
			top: calc(10em + 8px);
		}
	}
</style>
