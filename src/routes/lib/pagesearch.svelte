<script>
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    import { highlight, pageSearchActive, page } from "../storage.js";
    let pageInput;
    function keyDown (event)    {
        if ($pageSearchActive == true)  {
            if (event.keyCode == 13)    {
                search()
            }
            if (event.keyCode == 27)    {
                cancel()
            }
        }
    }

    function search ()  {
        if (/^\d+$/.test(pageInput))   {
            page.set(pageInput.length > 0 ? Number(pageInput - 1) : 0);
            pageSearchActive.set(false);
        } else  {
            alert("Please enter a number")
        }
    }
    function cancel ()  {pageSearchActive.set(false) }

    $: hoverColor = `--hoverColor:${$highlight};`
</script>
<div id="overlay" style={$pageSearchActive == true ? "display: flex;" : "display: none;"}></div>
<div class="dialog" style={$pageSearchActive == true ? "display: flex;" : "display: none;"}>
    <ul>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li class="page-back" style={hoverColor}><a on:click={cancel}>Back</a></li>
        <li class="page-search"><input placeholder="Type a page number" bind:value={pageInput}></li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li class="page-sumbit" style={hoverColor}><a on:click={search}>Search Page</a></li>
    </ul>
</div>
<svelte:window on:keydown={keyDown}></svelte:window>
<style>
    #overlay    {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--background);
        opacity: 0.8;
        z-index: 998;
        transition: background-color 1s;
    }
    .dialog  {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        list-style: none;
        top: 25%;
        left: calc(4em);
        width: calc(100% - 8em);
        background-color: var(--background);
        transition: background-color 1s;
        opacity: 1;
        z-index: 999;
        user-select: none;
    }
    ul  {
        width: 100%;
        display: flex;
        flex-direction: row;
        list-style: none;
        text-decoration: none;
        margin: 0;
        padding: 0;
        align-items: center;
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
    a   {
        width: 100%;
    }
</style>
