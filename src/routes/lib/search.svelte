<script>
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    import { highlight, searchActive } from "../storage.js";
    let username;
    function keyDown (event)    {
        if (event.keyCode == 13)    {
            goto(`/users/${username}`)
            searchActive.set(false)
        }
        if (event.keyCode == 27)    {
            searchActive.set(false)
        }
    }

    $: hoverColor = `--hoverColor:${$highlight};`
</script>
<ul>
    <li class="search"><input placeholder="Type a Scratch username..." bind:value={username}></li>
    <li class="submit" style={hoverColor}><a href="/users/{username}" on:click={searchActive.set(false)}>Search User</a></li>
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
    }
    input:focus {
        background-color: var(--background-hover);
    }
    .search {
        width: 100%;
        height: 2em;
    }
    .submit {
        background-color: var(--background-hover);
        width: 20%;
        height: 2em;
        display: flex;
        align-items: center;
        transition: background-color 0.25s;
    }
    .submit:hover {
        background-color: var(--hoverColor);
        transition: background-color 0.25s;
    }
    a   {
        width: 100%;
    }
</style>