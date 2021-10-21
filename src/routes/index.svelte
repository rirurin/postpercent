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
<main class="front-page-title-container">
    <div class="front-page-title">
        <div class="front-page-header">
            <div id="logo">
                postpercent
            </div>
        </div>
    </div>
</main>
<main>
    <div class="front-page-body">
        <div class="front-page-description">
            The tool for viewing statistics for the Scratch Forums
        </div>
        <div class="front-page-box-container">
            <div class="front-page-box">
                <div class="front-page-box-image">
                    Image
                </div>
                <div class="front-page-box-title">
                    Leaderboards
                </div>
            </div>
            <div class="front-page-box">
                <div class="front-page-box-image">
                    Image
                </div>
                <div class="front-page-box-title">
                    Users
                </div>
            </div>
        </div>
    </div>
</main>
<style>
    .front-page-header {
        font-size: 32px;
    }
    .front-page-box-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 15px 0%;
    }
    .front-page-box {
        width: calc(40% - 15px);
        background-color: var(--accent);
        display: flex;
        justify-content: space-between;
        padding: 15px 15px;
        align-items: center;
    }
    .front-page-box-title {
        font-weight: bold;
        font-size: 24px;
    }
    .front-page-title-container {
        background-color: var(--accent);
    }
</style>
