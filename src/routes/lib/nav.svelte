<script>
import { onMount } from 'svelte';
import Dialog from './dialog.svelte';
import Search from './search.svelte';

import { highlight, dialogActive, name, searchActive } from '../storage.js';
import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';

let logoColor = "var(--accent)";
let username;

$: if (logoColor != $highlight)   {
    logoColor = $highlight
}
onMount(async() => {
    logoColor = "var(--accent)";
    searchActive.set(false);
})

function toggleDialog() {$dialogActive ? dialogActive.set(false) : dialogActive.set(true)}
function toggleSearch() {$searchActive ? searchActive.set(false) : searchActive.set(true)}

function search()  {
    goto(`/users/${username || "CatsUnited"}`);
    searchActive.set(false);
}
function cancel()  {searchActive.set(false) }
$: hoverColor = `--hoverColor:${$highlight};`;
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

</script>

<div id="top-wrapper">
    <nav id="main-nav" style="width: {$searchActive ? '0%' : '100%'}; transition: width 0.3s;">
        <li id="logo">
            <a href="/" class="link">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 196" style="width: 2em;"><polygon fill="{$highlight}" class="cls-1" points="131.46 63 28 63 28 93 114.14 93 131.46 63"/><polygon fill="{$highlight}" class="cls-1" points="28 113 28 143 48.79 143 48.79 163 88.79 143 228 143 228 113 28 113"/><polygon fill="{$highlight}" class="cls-1" points="124.54 193 228 193 228 163 141.86 163 124.54 193"/></svg>
                {$name}
            </a>
        </li>
        <li class="link"><a href="/forum/0/1">Leaderboards</a></li>
        <li class="link" on:click={toggleSearch}>Users</li>
        <li class="link" on:click={toggleDialog}>Settings</li>
    </nav>
    <nav id="search-nav" style="width: {$searchActive ? '100%' : '0%'}; transition: width 0.3s;">
        <ul>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={cancel} class="back"><li style={hoverColor}>Back</li></a>
            <li class="search"><input placeholder="Type a Scratch username..." bind:value={username}></li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={search} class="submit"><li style={hoverColor}><nobr>Search User</nobr></li></a>
        </ul>
    </nav>
</div>
<svelte:window on:keydown={keyDown}></svelte:window>
<style>
    #top-wrapper {position: sticky; top: 0px; z-index: 999; padding: 0% 4%; display: flex; flex-direction: row; background-color: var(--background);}
    .link:hover {
        cursor: pointer;
    }
    @media only screen and (max-width: 720px)   {
        nav {
            flex-wrap: wrap;
        }
        nav li {
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            margin: auto;
            text-align: center;
            padding: auto 10%;
            width: 25%;
        }
        .search {
            width: 100%;
        }
        #logo   {
            justify-content: center;
            margin: auto;
            width: 100%;
        }
    }
    @media only screen and (max-width: 400px)   {
        nav  {
            flex-direction: column;
        }
        #logo   {
            width: auto;
        }
    }
    nav	{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        overflow: hidden;
    }
    nav li	{
        text-decoration: none;
        list-style: none;
        padding: 10px 15px;
        user-select: none;
    }
    nav li:hover	{
        background-color: var(--background-hover);
    }
    nav li:first-of-type	{
        margin-right: auto;
        font-weight: bold;
    }
    nav li:first-of-type:hover, .search:hover	{
        background-color: var(--background);
    }
    #search-nav ul  {
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
</style>