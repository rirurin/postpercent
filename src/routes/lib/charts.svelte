<script>
	import { onMount } from 'svelte';
	import Chart from "chart.js"
	
	export let username;
    export let color;
	export let colors;

	let precise, forum;
	let ctx, ctx2, ctx3, ctx4, ctx5;
	let postoffset;

	async function getData()    {
		/*
		ctx = document.getElementById("totalpostcountmonthly").getContext("2d");
		ctx2 = document.getElementById("totalpostcountweekly").getContext("2d");
		ctx3 = document.getElementById("postspermonth").getContext("2d");
		ctx4 = document.getElementById("postsperweek").getContext("2d");
		*/
		ctx5 = document.getElementById("postdistribution").getContext("2d");
		await fetch(`https://scratchdb.lefty.one/v3/forum/user/info/${username}/`)
        .then(res => res.json())
        .then(data => {
            forum = data;
			let value = [];
			let label = [];
			for (let i = 1; i < Object.keys(forum.counts).length - 1; i++)	{
				label.push(Object.entries(forum.counts)[i][0]);
				value.push(Object.entries(forum.counts)[i][1].count);
			}
			var chart = new Chart(ctx5, {
				type: 'pie',
				data: {
					datasets: [{
						data: value,
						backgroundColor: colors,
						label: 'Scratcher Posts'
					}],
					labels: label,
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			});
        })
		.catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
		ctx = document.getElementById("totalpostcountmonthly").getContext("2d");
		ctx3 = document.getElementById("postspermonth").getContext("2d");
		await fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=month&range=3650`)
		.then(res => res.json())
        .then(data => {
            precise = data;
			let dategraph = [];
			let postgraph = [];
            let postgraph2 = [];
			for (let i = 0; i < precise.length - 1; i++)	{
				dategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`)
				postgraph.push(precise[i].value)
                if (i == 0) {
                    postgraph2.push(precise[i].value)
                } else  {
                    postgraph2.push(precise[i].value - precise[i-1].value)
                }
			}
			postgraph.length > 11 ? postoffset = postgraph[postgraph.length - 12] : postoffset = 0;
			
			var chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: dategraph,
				datasets: [
				{
					label: `${username}`,
					backgroundColor: color,
					borderColor: color,
					data: postgraph,
					fill: false,
					tension: 0.05
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				}
			}
			});
            var chart = new Chart(ctx3, {
			type: "line",
			data: {
				labels: dategraph,
				datasets: [
				{
					label: `${username}`,
					backgroundColor: color,
					borderColor: color,
					data: postgraph2,
					fill: false,
					tension: 0.05
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				}
			}
			});
        })
		.catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
		ctx2 = document.getElementById("totalpostcountweekly").getContext("2d");
		ctx4 = document.getElementById("postsperweek").getContext("2d");
		await fetch(`https://scratchdb.lefty.one/v3/forum/user/graph/${username}/total?segment=6&range=365`)
		.then(res => res.json())
        .then(data => {
            precise = data;
			let dategraph = [];
			let postgraph = [];
			let postgraph2 = [];
			for (let i = 0; i < precise.length - 2; i++)	{
				dategraph.push(`${new Date(precise[i].date).getMonth() + 1}/${new Date(precise[i].date).getDate()}/${new Date(precise[i].date).getFullYear()}`)
				postgraph.push(precise[i].value + postoffset)
                if (i == 0) {
                    postgraph2.push(precise[i].value)
                } else  {
                    postgraph2.push(precise[i].value - precise[i-1].value)
                }
			}
			
			var chart = new Chart(ctx2, {
			type: "line",
			data: {
				labels: dategraph,
				datasets: [
				{
					label: `${username}`,
					backgroundColor: color,
					borderColor: color,
					data: postgraph,
					fill: false,
					tension: 0.05
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				}
			}
			});
            var chart = new Chart(ctx4, {
			type: "line",
			data: {
				labels: dategraph,
				datasets: [
				{
					label: `${username}`,
					backgroundColor: color,
					borderColor: color,
					data: postgraph2,
					fill: false,
					tension: 0.05
				}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				}
			}
			});
        })
		.catch(error => {
            console.error(error);
            throw new Error('Something went wrong D:');
        })
    }
    let promise = getData();
    onMount(async() => {
		promise = getData();
	});


</script>
<ul class="main-container">
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Post Distribution</li>
			<li class="category-header-right">As of {new Date().toLocaleString('en-US')}</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="postdistribution" height=500></canvas>
		</ul>
	</ul>
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Total Post Count</li>
    <li class="category-header-right">Monthly, All Time</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="totalpostcountmonthly" height=500></canvas>
		</ul>
	</ul>
</ul>
<ul class="main-container">
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Total Post Count</li>
    		<li class="category-header-right">Weekly, Past 12 Months</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="totalpostcountweekly" height=500></canvas>
		</ul>
	</ul>
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Posts Per Month</li>
    		<li class="category-header-right">All Time</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="postspermonth" height=500></canvas>
		</ul>
	</ul>
</ul>
<ul class="main-container">
	<ul class="chart-container">
		<ul class="chart-container-header">
			<li class="category-header-left">Posts Per Week</li>
    		<li class="category-header-right">Past 12 Months</li>
		</ul>
		<ul class="chart-container-main">
			<canvas id="postsperweek" height=500></canvas>
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
		width: 50%;
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
	
</style>