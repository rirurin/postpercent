<script>
    import { page, cat, categories, highlight, searchActive, isCategorySearching } from "../storage.js";
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    export let link, name;
    function catChange(a) { goto(`../${a}/1`); cat.update(n => n = $categories[link][1]); page.set(0); isCategorySearching.set(false);}
</script>
<li class="category-display clickable"><a on:click={catChange(link)}>{$categories[link][1]}</a></li>

<style>
    .category-display {
        list-style: none;
    }
    .category-display:hover {
        font-weight: bold;
    }
</style>