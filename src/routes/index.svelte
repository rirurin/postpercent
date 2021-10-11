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
wip postpercent homepage

<a href="forum/0/1">leaderboards</a>
<a href="users/CatsUnited">users</a>