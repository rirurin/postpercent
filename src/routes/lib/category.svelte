<script>
    import { page, cat, categories, highlight, searchActive } from "../storage.js";
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    export let link, name;
    function catChange(a) { goto(`../${a}/1`);}
</script>
<li class="category-display"><a on:click={catChange(link)}>{categories[name][1]}</a></li>

<style>
    .category-display {
        list-style: none;
    }
</style>