<script>
    import { cat, dropdownActive } from '../storage.js';
    const categories = ["total", "Announcements", "New Scratchers", "Help With Scripts", "Show and Tell", "Project Ideas", "Collaboration", "Requests", "Questions about Scratch", "Suggestions", "Bugs and Glitches", "Advanced Topics", "Connecting to the Physical World", "Open Source Projects", "Things I'm Making and Creating", "Things I'm Reading and Playing"];
    function changeCategory (category)  {
        cat.set(category)
    }
</script>
<ul style={$dropdownActive ? "display: flex; overflow-y: scroll;" : "display: none; overflow-y: hidden;"}>
    {#each categories as i}
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
        position: fixed;
        margin-left: 4%;
    }
    li  {
        border-bottom: 1px solid var(--text);
        padding: 5px 0;
        user-select: none;
    }
</style>