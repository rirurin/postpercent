<script>
    import { page, cat, categoryDropdownActive, categories, highlight, pageSearchActive } from './storage.js';
    import Graph from './lib/graph.svelte';
    import Dropdown from './lib/dropdown.svelte';
    import Header from './lib/header.svelte';
    import PageSearch from './lib/pagesearch.svelte';

    highlight.set("var(--accent)");
    pageSearchActive.set(false);
    
    function nextPage()  { page.update(n => n + 1);}
    function prevPage()  { $page == 0 ? page.set(0) : page.update(n => n - 1);}
    function searPage()  {$pageSearchActive ? pageSearchActive.set(false) : pageSearchActive.set(true)}
    function toggleDropdown() {$categoryDropdownActive ? categoryDropdownActive.set(false) : categoryDropdownActive.set(true)}
    let category = $cat;
    let categoryID = 0;
    $: category = $cat;
    $: for (let i in categories)   {
        if (categories[i][1] == $cat)   {
            categoryID = categories[i][0];
        }
    }
</script>
<Header>
    <div id="wrapper">
        <header>
            <ul>
                <li id="header-forum-category" on:click={toggleDropdown}>{category == "total" ? "All Categories" : category} <nobr><span class="iconify" data-icon="ion-caret-down" data-inline="false" style="font-size: 16px;"></span></nobr></li>
                <li id="header-forum-usercount"><nobr>Page {$page + 1}</nobr></li>
                
            </ul>
            <ul id="graph-navigation">
                <li><a href="/forum/{categoryID}/{$page + 1}"><span class="iconify" data-icon="topcoat:attachment" data-inline="false"></span></a></li>
                <li on:click={prevPage}><span class="iconify" data-icon="topcoat:back" data-inline="false" alt="Previous Page">Previous Page</span></li>
                <li on:click={searPage}><span class="iconify" data-icon="topcoat:search" data-inline="false" alt="Go to Page">Go to Page</span></li>
                <li on:click={nextPage}><span class="iconify" data-icon="topcoat:next" data-inline="false" alt="Next Page">Next Page</span></li>
               
            </ul>
        </header>
        <Dropdown options={categories.map(x => x[1])} type="leaderboard"></Dropdown>
        <PageSearch></PageSearch>
    </div>
</Header>
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
    #header-forum-category, #graph-navigation li    {
        cursor: pointer;
    }
    #header-forum-category	{
        font-size: 32px;
        font-weight: bold;
        user-select: none;
    }
    #wrapper {position: sticky; top: calc(3em + 2px); z-index: 996; width: 100%;}
    @media only screen and (max-width: 720px)   {
        #header-forum-category	{
            font-size: inherit;
        }
        #wrapper    {
            top: calc(5em + 8px);
        }
    }
    .page-link:hover    {
        cursor: pointer;
    }
</style>

<Graph page={page} category={category}></Graph>

{#if $pageSearchActive == true}
    <style>
        .page-link  {
            display: none;
        }
        .page-search {
            width: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
{/if}
{#if $pageSearchActive == false}
    <style>
        .page-search {
            display: none;
        }
    </style>
{/if}