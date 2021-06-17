<script context="module">
import '../app.css';
import Nav from './lib/nav.svelte';
import Header from './lib/header.svelte';
import Footer from './lib/footer.svelte';
import { activeTheme } from './storage.js';
</script>
<svelte:head>
	<title>postpercent</title>
</svelte:head>
<Nav></Nav>
<slot></slot>
<Footer></Footer>
{#if $activeTheme == "system"}
<style>
@media (prefers-color-scheme: dark)	{
	:root	{
		--background: #1c1c1c;
		--background-hover: #333333;
		--graph-axes: #4a4a4a;
		--text: #ffffff;
		--textAlt: #1c1c1c;
		--accent: #f54260;
	}
}
@media (prefers-color-scheme: light)	{
	:root	{
		--background: #efefef;
		--background-hover: #cdcdcd;
		--graph-axes: #4a4a4a;
		--text: #1c1c1c;
		--textAlt: #efefef;
		--accent: #f54260;
	}
}
</style>
{/if}

{#if $activeTheme == "dark"}
<style>
:root	{
	--background: #1c1c1c;
	--background-hover: #333333;
	--graph-axes: #4a4a4a;
	--text: #ffffff;
	--textAlt: #1c1c1c;
	--accent: #f54260;
}
</style>
{/if}
{#if $activeTheme == "light"}
<style>
:root	{
	--background: #efefef;
	--background-hover: #cdcdcd;
	--graph-axes: #4a4a4a;
	--text: #1c1c1c;
	--textAlt: #efefef;
	--accent: #f54260;
}
</style>
{/if}
{#if $activeTheme == "jeffalo"}
<style>
:root	{
	--background: #efefef;
	--background-hover: #cdcdcd;
	--graph-axes: #4a4a4a;
	--text: #1c1c1c;
	--textAlt: #efefef;
	--accent: #0fbd8c;
}
</style>
{/if}
<style>
:root	{
	--permBackground: #1c1c1c;
	--permText: #ffffff;
}
</style>