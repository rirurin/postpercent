<script>
import { onMount } from 'svelte';

    import { highlight } from '../storage.js';
    import { HEXtoRGB } from './hextorgb.js';

    let logoColor = "var(--accent)";
    let lightText = 0;
    $: if (logoColor != $highlight)   {
        logoColor = $highlight
        if (logoColor.length == 7)  {
            const contraster = [];
            contraster.push(HEXtoRGB(logoColor).r); contraster.push(HEXtoRGB(logoColor).g); contraster.push(HEXtoRGB(logoColor).b);
            const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);
            brightness > 150 ? lightText = 1 : lightText = 0;
        }
    }
    onMount(async() => {
        logoColor = "var(--accent)";
        lightText = 0;
    })
</script>

<footer style="background-color: {$highlight}; color: {lightText == 1 ? `#1c1c1c`: `#ffffff`}">
    <ul>
        <li>Contributors</li>
        <li>CatsUnited</li>
	    <li>9gr</li>
    </ul>
    <ul>
        <li>Data Used</li>
        <li>my-ocular API (Jeffalo)</li>
	    <li>ScratchDB (DatOneLefty)</li>
    </ul>
    <ul class="right">
        <li>Discuss</li>
        <li><a href="https://scratch.mit.edu/discuss/topic/424580/">Forum Topic <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
        <li><a href="https://github.com/rirurin/postpercent">Source Code <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
    </ul>
    <ul class="right">
        <li>Other Forum Tools</li>
        <li><a href="https://ocular.jeffalo.net/?utm_campaign=postpercent">ocular <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
	    <li><a href="https://scratory.vercel.app">scratory <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
    </ul>
</footer>
<style>
    footer	{
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 10px 4%;
        font-size: 12px;
        transition: background-color 1s, color 1s;
    }
    footer li	{
        text-decoration: none;
        list-style: none;
        padding: 3px 15px;
        color: inherit;
    }
    footer li:first-child   {
        font-weight: bold;
    }
    .right  {
        text-align: right;
    }
</style>
