<script context="module">
	export async function load (ctx)	{
		let category = ctx.page.params.slug;
        console.log(ctx.page.params.slug)
		return { props: {category}};
	}
</script>
<script>
    export let category;
    import { page, cat, categories, highlight, searchActive, isCategorySearching } from "../storage.js";
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    import Graph from '../lib/graph.svelte';
    import Header from '../lib/header.svelte';
    import Dropdown from '../lib/dropdown.svelte';
    import Category from '../lib/category.svelte';
    let title;
    let urlPage;
    let isPageSearching = 0;
    let pageInput;

    function nextPage()  { page.update(n => n + 1); }
    function prevPage()  { $page == 0 ? page.set(0) : page.update(n => n - 1);}
    function searPage()  { isPageSearching == 0 ? isPageSearching = 1 : isPageSearching = 0;}
    function searCat()   { $isCategorySearching ? isCategorySearching.set(false) : isCategorySearching.set(true);}
    function catChange(category) { cat.update(n => n = category);}

    function search()  {
        if (/^\d+$/.test(pageInput))   {
            page.set(pageInput.length > 0 ? Number(pageInput - 1) : 1);
            isPageSearching = 0;
        } else  {
            alert("Please enter a number");
        }
    }
    function cancel()  {isPageSearching = 0; }

    async function getData()    {
        for (let i = 0; i < category.length; i++)  {
            console.log(i)
            if (category.charAt(i) == "/")  {
                urlPage = category.substring(i + 1, category.length);
                category = category.substring(0, i);
                $page = urlPage - 1;
                break;
            }
        }
        for (let i in categories) {
            if (categories[i][0] == category)   {
                title = categories[i][1];
                $cat = title;
            }
        }
        if (title === undefined) { 
            title = "Private/Not a Forum";
        }
    }

    highlight.set("var(--accent)");

    let promise = getData();

    $: $page = urlPage - 1;
    $: hoverColor = `--hoverColor:${$highlight};`;
</script>
{#await promise}
    loading
{:then}
<Header>
    <div id="category-wrapper" class="cat-header" style="width: {$isCategorySearching ? '100%' : '0%'}; transition: width 0.3s;">
        <ul id="page-search-container" class="select-category-header">
            <li id="header-forum-category" class="clickable" on:click={searCat}><nobr>Select a Category <span class="iconify cat-caret-flip" data-icon="ion-caret-down" data-inline="false" style="font-size: 16px;"></span></nobr></li>
        </ul>
    </div>
    <div id="wrapper" class="cat-header" style="width: {isPageSearching == 1 || $isCategorySearching ? '0%' : '100%'}; transition: width 0.3s;">
        <ul>
            <li id="header-forum-category" class="clickable" on:click={searCat}><nobr><span class="iconify cat-caret" data-icon="ion-caret-down" data-inline="false" style="font-size: 16px;"></span>{$cat == "total" ? "All Categories" : $cat}</nobr></li>
            <li id="header-forum-usercount"><nobr>Page {$page + 1}</nobr></li>
            
        </ul>
        <ul id="graph-navigation" style="display: {$isCategorySearching ? 'none' : 'flex'};">
            <li on:click={prevPage} class="clickable"><a href="./{$page + 1}"><span class="iconify" data-icon="topcoat:back" data-inline="false" alt="Previous Page">Previous Page</span></a></li>
            <li on:click={searPage}><span class="iconify" data-icon="topcoat:search" data-inline="false" alt="Go to Page">Go to Page</span></li>
            <li on:click={nextPage} class="clickable"><a href="./{$page + 1}"><span class="iconify" data-icon="topcoat:next" data-inline="false" alt="Next Page">Next Page</span></a></li>
        </ul>
    </div>
    <div id="search-wrapper" class="cat-header" style="width: {isPageSearching == 0 ? '0%' : '100%'}; transition: width 0.3s;">
        <ul id="page-search-container">
            <!-- svelte-ignore a11y-missing-attribute -->
            <li class="page-back" style={hoverColor} on:click={cancel}><a>Back</a></li>
            <li class="page-search"><input placeholder="Type a page number" bind:value={pageInput}></li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a href="./{$page + 1}" class="page-sumbit" on:click={search}><li style={hoverColor}><nobr>Search Page</nobr></li></a>
        </ul>
    </div>
</Header>
<Header>
    <ul class="category-display-container" style="height: {$isCategorySearching ? '10em' : '0em'}; overflow-y: scroll;">
        {#each categories.map(x => x[1, 0]) as i, j}
            <Category link={i} name={j}></Category>
        {/each}
    </ul>
</Header>

<Graph page={$page} category={$cat}></Graph>
{/await}

<style>
    header	{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 4%;
    }
    header ul	{
        display: flex;
        flex-direction: row;
        width: 50%;
        padding: 0;
        align-items: flex-end;
    }
    header ul:nth-child(1)	{
        justify-content: flex-start;
    }
    header ul:nth-child(2)	{
        justify-content: flex-end;
    }
    header ul li	{
        text-decoration: none;
        list-style: none;
        margin: 0 10px;
    }
    #header-forum-category	{
        font-size: 32px;
        font-weight: bold;
        user-select: none;
    }
    .select-category-header {
        width: 100%;
        display: flex;
    }
    #wrapper {position: sticky; top: calc(3em + 2px); z-index: 996; overflow: hidden;}
    @media only screen and (max-width: 720px)   {
        #header-forum-category	{
            font-size: inherit;
        }
        #wrapper    {
            top: calc(5em + 8px);
        }
    }
    .cat-header {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: row;
    }
    #search-wrapper, #category-wrapper {
        overflow: hidden;
    }

    input   {
        font-family: inherit;
        font-size: inherit;
        width: 100%;
        background-color: var(--background);
        border: 0;
        outline: 0;
        transition: background-color 0.25s;
        color: var(--text);
        height: 1.9em;
        padding: 0 5px;
    }
    input:focus {
        background-color: var(--background-hover);
    }
    .page-search {
        width: 100%;
        height: 1.9em;
    }
    .page-sumbit, .page-back {
        background-color: var(--background-hover);
        height: 1.9em;
        display: flex;
        align-items: center;
        transition: background-color 0.25s;
        padding: 0 5px;
        cursor: pointer;
    }
    .page-sumbit:hover, .page-back:hover {
        background-color: var(--hoverColor);
        transition: background-color 0.25s;
    }
    .page-sumbit { width: 20%; } .page-back { width: 10%; }
    #page-search-container {
        width: 100%;
        justify-content: flex-end;
    }
    .category-selection {
        text-decoration: none;
        list-style: none;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        margin: 0 10px;
        align-self: center;
        justify-self: center;
        height: 2em;
    }
    .category-scroller {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        overflow-y: hidden;
        align-items: center;
    }
    .cat-caret {
        margin-right: 15px;
        transition: rotate 0.3s;
        transform: rotate(90deg)!important;
    }
    .cat-caret-flip {
        margin-left: 15px;
        transition: rotate 0.3s;
        transform: rotate(270deg)!important;
    }
    .category-display-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        width: 100%;
        user-select: none;
        margin: 0px;
        transition: height 0.3s;
    }
    #header-forum-usercount {
        user-select: none;
    }
</style>