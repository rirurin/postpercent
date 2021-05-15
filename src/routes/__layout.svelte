<script context="module">
import '../app.css';
import Nav from './components/nav.svelte';
import Footer from './components/footer.svelte';
</script>
<svelte:head>
	<title>postpercent</title>
</svelte:head>
<Nav></Nav>
<slot></slot>
<Footer></Footer>