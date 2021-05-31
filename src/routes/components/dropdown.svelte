<script>
    export let options;
    import { cat, dropdownActive } from '../storage.js';
    function changeCategory (category)  {
        cat.set(category);
        dropdownActive.set(false)
    }

</script>
<ul style={$dropdownActive ? "display: flex; overflow-y: scroll;" : "display: none; overflow-y: hidden;"}>
    {#each options as i}
        <li on:click={() => changeCategory(i)}>{i == "total" ? "All Categories" : i}</li>
    {/each}
</ul>
<style>
    ul  {
        background-color: var(--accent);
        flex-direction: column;
        width: 25%;
        padding: 10px 5px;
        max-height: 150px;
        position: absolute;
        margin-left: 4%;
    }
    li  {
        border-bottom: 1px solid var(--text);
        padding: 5px 0;
        user-select: none;
        cursor: pointer;
    }
    li:first-child  {
        border-top: 1px solid var(--text);
    }
</style>