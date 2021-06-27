<script context="module">
import '../app.css';
import Nav from './lib/nav.svelte';
import Header from './lib/header.svelte';
import Footer from './lib/footer.svelte';
import { theme } from './storage.js';
</script>
<svelte:head>
	<title>postpercent</title>
	<meta name="color-scheme" content={$theme == "system" ? "dark light jeffalo" : $theme}>
	<link rel="stylesheet" href="/themes/{$theme}.css">
</svelte:head>
<Nav></Nav>
<slot></slot>
<Footer></Footer>
<style>
:root	{
	--permBackground: #1c1c1c;
	--permText: #ffffff;
}
</style>