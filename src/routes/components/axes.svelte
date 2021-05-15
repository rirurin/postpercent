<script>
    export let pos;
    export let title;
</script>

<div id="title" style="margin-left: {pos}%">{title}</div>
<div id="axis" style="margin-left: {pos}%"></div>

<style>
    #axis   {
        height: 100%;
        z-index: -999;
        position: fixed;
        width: 2px;
        background-color: var(--graph-axes);
        height: 100%;
    }
    #title  {
        color: var(--graph-axes);
        background-color: var(--background);
        padding: 0 5px;
        z-index: -999;
        position: fixed;
        display: flex;
        align-self: center;
    }
</style>