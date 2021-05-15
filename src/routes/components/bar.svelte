<script>
    export let username;
    export let posts;
    export let rank;
    export let width;

    import { onMount } from 'svelte';
    let user;
    let custom;

    async function getData() {
        await fetch(`https://my-ocular.jeffalo.net/api/user/${username}`)
        .then(res => res.json())
        .then(data => {
            custom = data;
        })
        await fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`)
        .then(res => res.json())
        .then(data => {
            user = data;
        })
    }
    let promise = getData();
    
    onMount(async() => {
        promise = getData();
    })
</script>


{#await promise}
<p>Loading bar...</p>
{:then}
<div id="container">
    <ul class="rank">
        <li>{rank}</li>
    </ul>
    <ul class="bar" style="width: {width}%; background-color: {custom.color};">
        <!-- svelte-ignore a11y-missing-attribute -->
        {#if user}
            <li><img src="https://cdn2.scratch.mit.edu/get_image/user/{user.id}_90x90.png" style={width > 3 ? "width: 2em; height: 2em;" : "display: none;"}></li>
        {:else}
        <li><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></li>
        {/if}
        <li class="username"><a href="https://shefwerld.rirurin.com/post/user?user={user.username}"><nobr>{user.username}</nobr></a></li>
        <li class="posts">{posts}</li>
    </ul>
</div>
{/await}

<style>
    #container  {
        display: flex;
        justify-content: flex-start;
    }
    .rank   {
        min-width: 3%;
        font-weight: bold;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    .bar  {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 3px 0;
        padding: 0;
        background-color: var(--background-hover);
        height: calc(2.4em);
    }
    li  {
        text-decoration: none;
        color: inherit;
        list-style: none;
        margin: 0 5px;
    }
    .bar li:last-child   {
        margin-left: auto;
    }
    .posts {
        font-weight: bold;
    }
</style>