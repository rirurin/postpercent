<script>
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    import { highlight, searchActive } from "../storage.js";
    let username;
    function keyDown (event)    {
        if ($searchActive == true)  {
            if (event.keyCode == 13)    {
                search()
            }
            if (event.keyCode == 27)    {
                cancel()
            }
        }
    }

    function search ()  {
        goto(`/users/${username || "CatsUnited"}`);
        searchActive.set(false);
    }
    function cancel ()  {searchActive.set(false) }

    $: hoverColor = `--hoverColor:${$highlight};`
</script>
<ul>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li class="back" style={hoverColor}><a on:click={cancel}>Back</a></li>
    <li class="search"><input placeholder="Type a Scratch username..." bind:value={username}></li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li class="submit" style={hoverColor}><a on:click={search}>Search User</a></li>
</ul>
<svelte:window on:keydown={keyDown}></svelte:window>
<style>
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
    .search {
        width: 100%;
        height: 1.9em;
    }
    .submit, .back {
        background-color: var(--background-hover);
        height: 1.9em;
        display: flex;
        align-items: center;
        transition: background-color 0.25s;
        padding: 0 5px;
        cursor: pointer;
    }
    .submit:hover, .back:hover {
        background-color: var(--hoverColor);
        transition: background-color 0.25s;
    }
    .submit { width: 20%; } .back { width: 10%; }
    a   {
        width: 100%;
    }
</style>
