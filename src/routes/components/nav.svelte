<div id="wrapper">
    <nav>
        <li id="logo">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 196" style="width: 2em;"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="cls-1" points="131.46 63 28 63 28 93 114.14 93 131.46 63"/><polygon class="cls-1" points="28 113 28 143 48.79 143 48.79 163 88.79 143 228 143 228 113 28 113"/><polygon class="cls-1" points="124.54 193 228 193 228 163 141.86 163 124.54 193"/></svg>
            postpercent <span style="color: var(--accent)">alpha</span>
        </li>
        <li><a href="../">Leaderboards</a></li>
        <li><a href="../users/CatsUnited">Users</a></li>
        <li>Settings</li>
    </nav>
</div>
<style>
    #wrapper {position: sticky; top: 0px; z-index: 999; width: 100%;}
    nav	{
        background-color: var(--background);
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0 4%;
    }
    nav li	{
        text-decoration: none;
        list-style: none;
        padding: 10px 15px;
        user-select: none;
    }
    nav li:hover	{
        background-color: var(--background-hover);
    }
    nav li:first-of-type	{
        margin-right: auto;
        font-weight: bold;
    }
    #logo {
        font-family: 'Noto Sans JP', Arial, Helvetica, sans-serif;
    }
    @media only screen and (max-width: 720px)   {
        nav {
            flex-wrap: wrap;
        }
        nav li {
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            margin: auto;
            text-align: center;
            padding: auto 10%;
        }
        #logo   {
            justify-content: center;
            margin: auto;
            width: 100%;
        }
    }
    @media only screen and (max-width: 400px)   {
        nav  {
            flex-direction: column;
        }
        #logo   {
            width: auto;
        }
    }
</style>