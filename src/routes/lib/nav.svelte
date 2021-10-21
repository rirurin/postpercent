<script>
import { onMount } from 'svelte';
import Dialog from './dialog.svelte';
import Search from './search.svelte';

import { highlight, dialogActive, name, searchActive } from '../storage.js';

let logoColor = "var(--accent)";

$: if (logoColor != $highlight)   {
    logoColor = $highlight
}
onMount(async() => {
    logoColor = "var(--accent)";
    searchActive.set(false);
})

function toggleDialog() {$dialogActive ? dialogActive.set(false) : dialogActive.set(true)}
function toggleSearch() {$searchActive ? searchActive.set(false) : searchActive.set(true)}

</script>

<div id="wrapper">
    <nav>
        <li id="logo">
            <a href="/" class="link">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 196" style="width: 2em;"><polygon fill="{$highlight}" class="cls-1" points="131.46 63 28 63 28 93 114.14 93 131.46 63"/><polygon fill="{$highlight}" class="cls-1" points="28 113 28 143 48.79 143 48.79 163 88.79 143 228 143 228 113 28 113"/><polygon fill="{$highlight}" class="cls-1" points="124.54 193 228 193 228 163 141.86 163 124.54 193"/></svg>
                {$name}
            </a>
        </li>
        <li class="link"><a href="/forum/0/1">Leaderboards</a></li>
        <li class="link" on:click={toggleSearch}>Users</li>
        <li class="link" on:click={toggleDialog}>Settings</li>
        <li class="search"><Search></Search></li>
    </nav>
</div>
<Dialog></Dialog>
<style>
    #wrapper {position: sticky; top: 0px; z-index: 999; width: 100%;}
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
	background-color: var(--background);
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
	padding: 0 4%;
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
</style>
{#if $searchActive == true}
    <style>
        .link  {
            display: none;
        }
        .search {
            width: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
{/if}
{#if $searchActive == false}
<style>
    .search {
        display: none;
    }
</style>
{/if}