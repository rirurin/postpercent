<script>
    import { onMount } from 'svelte';
    import { theme } from './storage.js';
    import Header from './lib/header.svelte';
    let contributors;
	async function getData()    {
		await fetch(`https://api.github.com/repos/rirurin/postpercent/contributors`)
        .then(res => res.json())
        .then(data => {
            contributors = data;
            console.log(contributors);
        })
		.catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
    }
    let promise = getData();
</script>
{#await promise}
<img src="/loading.gif" alt="Loading" class="loading" style="filter: {$theme == "light" || $theme == "jeffalo" ? `brightness(-100)` : `brightness(100)`}">
{:then}
    <Header>
        <div class="about-header">
            List of contributors
        </div>
    </Header>
    <div class="about-container">
        {#each contributors as contributor}
            <div class="contributor-container">
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="https://avatars.githubusercontent.com/u/{contributor.id}?v=4" style="width: 100px;">
                <div class="contributor-container-right">
                    <a href={contributor.html_url} class="contributor-username">{contributor.login}</a>
                    {#if contributor.contributions == 1}
                        {contributor.contributions} contribution
                    {:else}
                        {contributor.contributions} contributions
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/await}
<style>
    .about-container {
        padding: 0% calc(4% + 10px);
    }
    .about-header {
        padding: 10px 0;
    }
    .about-container {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .contributor-container {
        width: 50%;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }
    .contributor-container-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
    }
    .contributor-username {
        font-weight: bold;
        font-size: 24px;
    }
</style>