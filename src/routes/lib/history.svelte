<script>
	import { onMount } from 'svelte';
import { dataset_dev } from 'svelte/internal';

    export let username;
    export let color;
	export let colors;
    export let categories;
    const forums = [];
    const dates = {maxArray: [], dates: []};
    const postData = {};
    const postDataMonthly = {};
    const linegraphinfo = {monthly: {}, total: {}, colors: []};
    let ctx;
    let src = `https://scratchdb.lefty.one/v3/forum/user/graph/${username}/`;

	async function getData()    {
        ctx = document.getElementById("posthistory").getContext("2d");
        for (let i in Object.keys(categories)) {
            forums.push(Object.keys(categories)[i]);
        }
        const forumcategories = Promise.all(forums.map(x => fetch(`${src}${x}`)))
            .then(res => { return Promise.all(res.map(response => { return response.json();}));})
            .then(data => {
                /* get longest length data set */
                for (let i in data) {
                    if (data[i].length > dates.maxArray.length)  {
                        dates.maxArray = data[i]
                    }
                }

                /* create dates */
                for (let i in dates.maxArray)    {
                    dates.dates.push(`${new Date(dates.maxArray[i].date).getMonth() + 1}/${new Date(dates.maxArray[i].date).getFullYear()}`)
                }
                console.log(dates)

                for (let i in forums)   {
                    console.log(forums[i])
                    postData[i] = new Array
                    postDataMonthly[i] = new Array
                }
                
                for (let j in postData) {
                    for (let i = 0; i < dates.maxArray.length - data[j].length; i++)   { 
                        postData[j].push(0) 
                    }
                    for (let i in data[j])  { 
                        postData[j].push(data[j][i].value) 
                    }
                }
                for (let j in postDataMonthly) {
                    for (let i = 0; i < dates.maxArray.length - data[j].length; i++)   { 
                        postDataMonthly[j].push(0) 
                    }
                    for (let i in data[j])  {
                        if (data[j][i-1] == undefined)   {
                            postDataMonthly[j].push(data[j][i].value) 
                        } else  {
                            postDataMonthly[j].push(data[j][i].value - data[j][i-1].value) 
                        }
                    }
                }
                console.log(postData);

                /* line chart */
                linegraphinfo.total.labels = dates.dates
                linegraphinfo.total.datasets = []
                linegraphinfo.monthly.labels = dates.dates
                linegraphinfo.monthly.datasets = []

                for (let i in postData)   {
                    /* total post count data */
                    linegraphinfo.total.datasets[i] = {}
                    linegraphinfo.total.datasets[i].label = forums[i]
                    linegraphinfo.colors.push(colors[i]);
                    linegraphinfo.total.datasets[i].backgroundColor = colors[i];
                    linegraphinfo.total.datasets[i].borderColor = colors[i];
                    linegraphinfo.total.datasets[i].data = postData[i]
                    linegraphinfo.total.datasets[i].fill = false
                    linegraphinfo.total.datasets[i].lineTension = 0

                    /* monthly post count data */
                    linegraphinfo.monthly.datasets[i] = {}
                    linegraphinfo.monthly.datasets[i].label = forums[i]
                    linegraphinfo.monthly.datasets[i].backgroundColor = colors[i];
                    linegraphinfo.monthly.datasets[i].borderColor = colors[i];
                    linegraphinfo.monthly.datasets[i].data = postDataMonthly[i]
                    linegraphinfo.monthly.datasets[i].fill = false
                    linegraphinfo.monthly.datasets[i].lineTension = 0
                }
                linegraphinfo.total.datasets.shift()
                linegraphinfo.monthly.datasets.shift()

                var chart = new Chart(ctx, {
                    type: 'line',
                    data: linegraphinfo.total,
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Posts Over Time'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            x: {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date'
                                }
                            },
                            y: {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Posts'
                                }
                            }
                        }
                    }
                });
            });
    }
    let promise = getData();
    onMount(async() => {
		promise = getData();
	});


</script>

<ul class="main-container">
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Post Count History</li>
    		<li class="category-header-right">Each Forum Category, Monthly, All Time</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="posthistory" height=200></canvas>
		</ul>
	</ul>
</ul>

<style>
	canvas	{
		overflow: hidden;
	}
	.main-container {
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
	}
    .chart-container	{
		display: flex;
        flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		width: 100%;
        margin: 0;
        padding: 0;
	}
	.chart-container-header	{
		display: flex;
        flex-direction: row;
		justify-content: flex-end;
		align-items: flex-end;
		width: 100%;
        margin: 0;
        padding: 0;
	}
	.chart-container-main {
		width: 100%;
	}
	.chart-container li:first-of-type	{
		margin-right: auto;
	}
    .chart-container li	{
        text-decoration: none;
        list-style: none;
        margin: 0 10px;
    }
    .category-header-left	{
        font-size: 32px;
        font-weight: bold;
    }
	@media only screen and (max-width: 1200px)   {
		.main-container {
			flex-direction: column;
		}
		.chart-container {
			width: 100%;
		}
	}
</style>