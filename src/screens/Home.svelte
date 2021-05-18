<script lang="ts">
	import BusinessCard from "../boxes/BusinessCard.svelte";
	import Box from "../boxes/Box.svelte";
	import Goals from "../boxes/Goals.svelte";
	import { fade } from "svelte/transition";
	import { isUndefined } from "../globalFunctions";
	import Socials from "../boxes/Socials.svelte";

	// process data
	export let data: any;
	let name: string = data.firstName + " " + data.lastName;
	let educationLine: string = "No education found";
	if (data.education) {
		let latestEducation: any = data.education[0];
		if (!isUndefined(latestEducation)) {
			if (!isUndefined(latestEducation.degree.shortForm)) {
				educationLine = latestEducation.degree.shortForm + ", ";
			} else {
				educationLine = "";
			}
			educationLine += latestEducation.school;
		}
	}

	// variables for opening different dashboards
	export let openEducation: boolean;
	export let openExp: boolean;
	export let openProjects: boolean;
	export let openApps: boolean;
	export let openRefBook: boolean;
</script>

<main in:fade={{ duration: 500, delay: 750 }} out:fade={{ duration: 500 }}>
	<h1>easyPD</h1>
	<div id="boxes">
		<div id="left-boxes">
			<BusinessCard
				{name}
				title={data.position}
				src="https://media-exp1.licdn.com/dms/image/C5603AQHcMyh8xk8pXA/profile-displayphoto-shrink_800_800/0/1606009294022?e=1625702400&v=beta&t=IIiczs8SZcUt5iwtRgi0TDa6TpxCgQGerIiytX7qLrY"
				education={educationLine}
				headline={data.headline}
				status={data.statusNum}
			/>
			<Box name="references" bind:isOpen={openRefBook} />
			<Socials socialData={data.socials} />
		</div>
		<div id="right-boxes">
			<div id="right-row-1">
				<Box name="education" bind:isOpen={openEducation} />
				<Box name="experience" bind:isOpen={openExp} />
			</div>
			<div id="right-row-2">
				<Box name="projects" bind:isOpen={openProjects} />
				<Box name="applications" bind:isOpen={openApps} />
			</div>
			<Goals />
		</div>
	</div>
</main>

<style>
	h1 {
		color: white;
		padding: 0 1rem 2.5rem;
		margin: 0;
		font-size: 3rem;
	}

	#boxes {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#right-row-1 {
		display: grid;
		grid-template-columns: 40% 60%;
	}
	#right-row-2 {
		display: grid;
		grid-template-columns: 60% 40%;
		grid-auto-rows: 1fr;
	}

	@media (min-width: 640px) {
	}
</style>
