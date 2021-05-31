<script>
    export let username;
    export let posts;
    export let rank;
    export let width;

    import { onMount } from 'svelte';
    let user;
    let custom;
    let barWidth = 0;
    let barColor = "#333333";
    let lightText = 0;

    function HEXtoRGB (hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;
    }

    async function getData() {
        await fetch(`https://scratchdb.lefty.one/v3/user/info/${username}`)
        .then(res => res.json())
        .then(data => {
            user = data;
            barWidth = width;
        })
        await fetch(`https://my-ocular.jeffalo.net/api/user/${username}`)
        .then(res => res.json())
        .then(data => {
            custom = data;
            barColor = custom.color;
            
            if (custom.color)   {
                const contraster = [];
                contraster.push(HEXtoRGB(custom.color).r); contraster.push(HEXtoRGB(custom.color).g); contraster.push(HEXtoRGB(custom.color).b);
                const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);
                if (brightness > 150)   {  
                    lightText = 1;
                }
            }
        })
    }
    let promise = getData();
    
    onMount(async() => {
        promise = getData();
    })
</script>


<div id="container">
    <ul class="rank">
        <li>{rank}</li>
    </ul>
    <ul class="bar" style="width: {barWidth}%; background-color: {barColor}; color: {lightText == 1 ? `var(--background)` : `var(--text)`}; transition: width 1s, background-color 1s, color 1s;">
        {#if user}
            <!-- svelte-ignore a11y-missing-attribute -->
            <li><a href="/users/{user.username}"><img src="https://cdn2.scratch.mit.edu/get_image/user/{user.id}_90x90.png" style={width > 5 ? "width: 2em; height: 2em;" : "display: none;"}></a></li>
            <li class="username"><a href="/users/{user.username}"><nobr>{user.username}</nobr></a></li>
            <li class="posts"><a href="/users/{user.username}">{posts}</a></li>
        {:else}
            <li><a href="/users/{username}"><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></a></li>
            <li class="username"><a href="/users/{username}"><nobr>{username}</nobr></a></li>
            <li class="posts"><a href="/users/{username}">{posts}</a></li>
        {/if}
    </ul>
</div>

<style>
    #container  {
        display: flex;
        justify-content: flex-start;
    }
    .rank   {
        min-width: 3%;
        font-weight: bold;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
    }
    .bar  {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 3px 0;
        padding: 0;
        background-color: var(--background-hover);
        height: calc(2.4em);
    }
    li  {
        text-decoration: none;
        color: inherit;
        list-style: none;
        margin: 0 5px;
    }
    .bar li:last-child   {
        margin-left: auto;
    }
    .posts {
        font-weight: bold;
    }
    .username   {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>