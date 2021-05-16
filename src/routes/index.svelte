<script>
    import { page, cat, dropdownActive } from './storage.js';
    import Graph from './components/graph.svelte';
    import Dropdown from './components/dropdown.svelte';
    import Dialog from './components/dialog.svelte';

    function nextPage()  { page.update(n => n + 1);}
    function prevPage()  { $page == 0 ? page.set(0) : page.update(n => n - 1);}
    function searPage()  {const pageInput = parseInt(prompt("Search for a page"), 10); /^[0-9.,]+$/.test(pageInput) ? page.set(pageInput - 1) : alert("Not a number :(((((")}
    function settings()  {alert("(NOT IMPLEMENTED YET) Graph Settings");}
    function toggleDropdown() {$dropdownActive ? dropdownActive.set(false) : dropdownActive.set(true)}
    let category = $cat;
    $: category = $cat;
</script>
<div id="wrapper">
    <header>
        <ul>
            <!--<li id="header-forum-category">All Categories</li>-->
            <li id="header-forum-category" on:click={toggleDropdown}>{category == "total" ? "All Categories" : category} <nobr><span class="iconify" data-icon="ion-caret-down" data-inline="false" style="font-size: 16px;"></span></nobr></li>
            <li id="header-forum-usercount"><nobr>Page {$page + 1}</nobr></li>
            
        </ul>
        <ul id="graph-navigation">
            <li on:click={prevPage}><span class="iconify" data-icon="topcoat:back" data-inline="false" alt="Previous Page">Previous Page</span></li>
            <li on:click={searPage}><span class="iconify" data-icon="topcoat:search" data-inline="false" alt="Go to Page">Go to Page</span></li>
            <li on:click={nextPage}><span class="iconify" data-icon="topcoat:next" data-inline="false" alt="Next Page">Next Page</span></li>
            <li on:click={settings}><span class="iconify" data-icon="bytesize:settings" data-inline="false" alt="Settings">Settings</span></li>
        </ul>
    </header>
    <Dropdown></Dropdown>
</div>

<style>
    header	{
        background-color: var(--accent);
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
    #wrapper {position: sticky; top: calc(3em + 2px); z-index: 999; width: 100%;}
</style>
<Graph page={page} category={category}></Graph>