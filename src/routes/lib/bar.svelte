<script>
    export let username;
    export let posts;
    export let rank;
    export let width;
    export let percentage;
    export let page;

    import { onMount } from 'svelte';
    import { cat, theme } from '../storage.js';
    let user;
    let custom;
    let barWidth = 0;
    let barColor = "var(--background-hover)";
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
        .catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
        await fetch(`https://my-ocular.jeffalo.net/api/user/${username}`)
        .then(res => res.json())
        .then(data => {
            custom = data;
            barColor = custom.color;

            if (custom.color && custom.color.length == 7)   {
                const contraster = [];
                contraster.push(HEXtoRGB(custom.color).r); contraster.push(HEXtoRGB(custom.color).g); contraster.push(HEXtoRGB(custom.color).b);
                const brightness = Math.round(((parseInt(contraster[0]) * 299) + (parseInt(contraster[1]) * 587) + (parseInt(contraster[2]) * 114)) / 1000);
                if ($theme == "system" || $theme == "dark") {
                    brightness > 150 ? lightText = 1 : lightText = 0;
                } else  {
                    brightness < 150 ? lightText = 1 : lightText = 0;
                }
            }
        })
        .catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
    }
    let promise = getData();
    
    onMount(async() => {
        promise = getData();
    })
</script>


<div id="container">
    <ul class="rank" style="min-width: calc(2.5em + {Math.floor(Math.log(page + 1))/2}em);">
        <li>{rank}</li>
    </ul>
    <ul class="bar" style="width: {barWidth}%; background-color: {barColor}; color: {lightText == 1 && width > 5 ? `var(--background)` : `var(--text)`}; transition: width 1s, background-color 1s, color 1s;">
        {#if user}
            <!-- svelte-ignore a11y-missing-attribute -->
            <li><a href="/users/{user.username}"><img src="https://cdn2.scratch.mit.edu/get_image/user/{user.id}_90x90.png" style={width > 5 ? "width: 2em; height: 2em;" : "display: none;"}></a></li>
            <li class="username"><a href="/users/{user.username}"><nobr>{user.username}</nobr></a></li>
            <li class="posts">
                <a href="/users/{user.username}" style="font-weight: bold;">{posts}</a>
                {#if barWidth > 12 && $cat != "total"}
                    <span class="percentage">({percentage}%)</span>
                {/if}
            </li>
        {:else}
            <li><a href="/users/{username}"><span class="iconify" data-icon="ant-design:user-outlined" data-inline="false"></span></a></li>
            <li class="username"><a href="/users/{username}"><nobr>{username}</nobr></a></li>
            <li class="posts">
                <a href="/users/{username}" style="font-weight: bold;">{posts}</a>
                {#if barWidth > 12 && $cat != "total"}
                    <span class="percentage">({percentage}%)</span>
                {/if}
            </li>
        {/if}
    </ul>
</div>

<style>
    #container  {
        display: flex;
        justify-content: flex-start;
    }
    .rank   {
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
        white-space: nowrap;
    }
    .username   {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    @media only screen and (max-width: 1200px)   {
        .percentage {
            display: none;
        }
    }
    @media only screen and (max-width: 1600px)   {
        .percentage {
            font-size: 12px;
        }
    }
</style>