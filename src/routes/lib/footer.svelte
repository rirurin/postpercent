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
        } else {
            lightText = 0;
        }
    }
    onMount(async() => {
        logoColor = "var(--accent)";
    })
</script>

<footer style="background-color: {$highlight}; color: {lightText == 1 ? `#1c1c1c`: `#ffffff`}">
    <ul>
        <li>Contributors</li>
        <li><a href="/about">View Contributors</a></li>
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
        <li>The Toolkit</li>
        <li><a href="https://ocular.jeffalo.net/?utm_campaign=postpercent">ocular <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
	    <li><a href="https://scratory.vercel.app">scratory <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
        <li><a href="https://scratchstats.com/">ScratchStats <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
	    <li><a href="https://magnifier.potatophant.net/">Magnifier <span class="iconify" data-icon="heroicons-solid:external-link" data-inline="false"></span></a></li>
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
    @media only screen and (max-width: 720px)   { 
        footer  {
            flex-direction: column;
        }
        footer ul, .right   {
            text-align: center;
            display: flex;
            flex-direction: row;
        }
    }
</style>