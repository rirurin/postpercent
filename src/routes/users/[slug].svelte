<script context="module">
	export async function load({ slug }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${slug}.json`);
		const data = await res.json();
		if (res.status === 200) {
			return { post: data };
		} else {
			return res.status
		}
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.counts.total.count}</title>
</svelte:head>