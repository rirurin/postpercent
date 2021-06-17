<script context="module">
	export async function load (ctx)	{
		let slug = ctx.page.params.slug;
		return { props: {slug}};
	}
</script>
<script>
    export let slug;
    import { categories } from "../storage.js";
    let title;
    for (let i in categories) {
        if (categories[i][0] == slug)   {
            title = categories[i][1];
        }
    }
    if (title === undefined) { title = "Private/Not a Forum" }
</script>
{#await title}
    loading
{:then} 
    <h1>{title}</h1>
    <p>{slug}</p>
{/await}