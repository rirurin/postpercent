<div id="overlay">
</div>
<ul>
    <li>Header!</li>
    <li>Test!</li>
</ul>
<style>
    #overlay    {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--background);
        opacity: 0.8;
        z-index: 10000;
    }
    ul  {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        list-style: none;
        top: 50%;
        margin: auto;
        background-color: var(--accent);
        opacity: 1;
        z-index: 10001;
    }
    li:first-child  {
        font-size: 32px;
    }
</style>