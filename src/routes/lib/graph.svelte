<script>
    import { onMount } from 'svelte';
    import { page, cat } from '../storage.js';
    import Bar from './bar.svelte';
    // import Axes from './axes.svelte';

    export let category;

    let users;
    let pageCheck = $page;
    let catCheck = $cat;
    let graphGap, axisInterval, axisAdjust;


    async function getData()    {
        await fetch(`https://scratchdb.lefty.one/v3/forum/category/rank/${category}/${$page}`)
        .then(res => res.json())
        .then(data => {
            users = data;
            graphGap = 1;
            for (let i = 0; i < String(users[0].counts[category].count).length - 1; i++) { graphGap += String(0)}
            axisInterval = Math.round(users[0].counts[category].count / graphGap);
            axisAdjust = ((graphGap * axisInterval) / users[0].counts[category].count);
        })
    }
    let promise = getData();
    onMount(async() => {
        // promise = getData();
    })
    $: if ($page != pageCheck)  {
        promise = getData();
        pageCheck = $page;
    }
    $: if ($cat != catCheck)    {
        promise = getData();
        catCheck = $cat;
    }
</script>
<svelte:head>
    {#await promise}
        <title>Loading leaderboards for {$cat}</title>
    {:then} 
        <title>{$cat == "total" ? "All Categories" : $cat} - postpercent</title>
    {:catch}
        <title>Looks like something happened...</title>
    {/await}
</svelte:head>
<main>
{#await promise}
<img src="/loading.gif" alt="Loading" class="loading">
{:then}
    <!--
    <Axes pos={2.7} title={0}></Axes>
    {#each Array(axisInterval) as _, i}
        <Axes pos={2.7 + (89 * axisAdjust) / axisInterval * (i + 1)} title={graphGap * (i + 1)}></Axes>
    {/each}
    -->
    {#each users as {username, counts}, i }
        <Bar username={username} posts={counts[category].count} rank={i+1 + $page*100} width={counts[category].count / users[0].counts[category].count * 97} percentage={Math.round(counts[category].count / counts.total.count * 10000) / 100} page={$page} />
    {/each}
{:catch}
    <p>how did you find page {$page + 1} are you hacking</p>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="https://media1.tenor.com/images/a7e1806acb87623ea0d4fda7bcfb4306/tenor.gif">
{/await}
</main>
<style>
    main   {
        padding: 10px calc(4% + 10px);
    }
</style>