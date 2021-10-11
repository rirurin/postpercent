<script context="module">
	export async function load (ctx)	{
		let category = ctx.page.params.slug;
        console.log(ctx.page.params.slug)
		return { props: {category}};
	}
</script>
<script>
    export let category;
    import { page, cat, categories, highlight } from "../storage.js";
    import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
    import Graph from '../lib/graph.svelte';
    import Header from '../lib/header.svelte';
    import Dropdown from '../lib/dropdown.svelte';
    let title;
    let urlPage;

    async function getData()    {
        for (let i = 0; i < category.length; i++)  {
            console.log(i)
            if (category.charAt(i) == "/")  {
                urlPage = category.substring(i + 1, category.length);
                category = category.substring(0, i);
                $page = urlPage - 1;
                break;
            }
        }
        for (let i in categories) {
            if (categories[i][0] == category)   {
                title = categories[i][1];
                $cat = title;
            }
        }
        if (title === undefined) { 
            title = "Private/Not a Forum";
        }
    }

    highlight.set("var(--accent)");

    let promise = getData();

    $: $page = urlPage - 1
</script>
{#await promise}
    loading
{:then}
<Header>
    <div id="wrapper" class="cat-header">
        <ul>
            <li id="header-forum-category">{title == "total" ? "All Categories" : title}</li>
            <li id="header-forum-usercount"><nobr>Page {$page + 1}</nobr></li>
            
        </ul>
        <ul id="graph-navigation">
            <li><span class="iconify" data-icon="topcoat:back" data-inline="false" alt="Previous Page">Previous Page</span></li>
            <li><span class="iconify" data-icon="topcoat:search" data-inline="false" alt="Go to Page">Go to Page</span></li>
            <li><span class="iconify" data-icon="topcoat:next" data-inline="false" alt="Next Page">Next Page</span></li>
           
        </ul>
    </div>
</Header>

<Graph page={$page} category={$cat}></Graph>
{/await}

<style>
    header	{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 4%;
    }
    header ul	{
        display: flex;
        flex-direction: row;
        width: 50%;
        padding: 0;
        align-items: flex-end;
    }
    header ul:nth-child(1)	{
        justify-content: flex-start;
    }
    header ul:nth-child(2)	{
        justify-content: flex-end;
    }
    header ul li	{
        text-decoration: none;
        list-style: none;
        margin: 0 10px;
    }
    #header-forum-category	{
        font-size: 32px;
        font-weight: bold;
        user-select: none;
    }
    #wrapper {position: sticky; top: calc(3em + 2px); z-index: 996; width: 100%;}
    @media only screen and (max-width: 720px)   {
        #header-forum-category	{
            font-size: inherit;
        }
        #wrapper    {
            top: calc(5em + 8px);
        }
    }
    .cat-header {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: row;
    }
</style>