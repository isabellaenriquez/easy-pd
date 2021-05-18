<script lang="ts">
	import Template1 from "./screens/Template1.svelte";
	import Home from "./screens/Home.svelte";
	import AddressBook from "./screens/AddressBook.svelte";
	import Education from "./screens/Education.svelte";
	import { onMount } from 'svelte';
	import { isUndefined } from './globalFunctions';
	import Experience from "./screens/Experience.svelte";
	import CreateProfile from './screens/CreateProfile.svelte';

	let openEducation: boolean = false;
	let openExp: boolean = false;
	let openProjects: boolean = false;
	let openApps: boolean = false;
	let openRefBook: boolean = false;
	let openGoals: boolean = false;

	function openHome() {
		if (openEducation) {
			openEducation = false;
		} else if (openExp) {
			openExp = false;
		} else if (openProjects) {
			openProjects = false;
		} else if (openApps) {
			openApps = false;
		} else if (openRefBook) {
			openRefBook = false;
		} else if (openGoals) {
			openGoals = false;
		}
	}

	let data: any = {};
	let loaded: boolean = false; // whether or not data has been fetched
	let showCreate: boolean = false;

	onMount(async() =>{
		const res = await fetch('./data');
		data = await res.json();
		
		if (isUndefined(data)){
			// TODO: create profile
			showCreate = true;
		}else {
			loaded = true;
		}
	});

</script>

<main>
	{#if loaded}
		{#if openEducation}
			<Template1 pageTitle="education" on:home={openHome}>
				<Education educationData={data.education}/>
			</Template1>
		{:else if openExp}
			<Template1 pageTitle="experience" on:home={openHome}>
				<Experience expData={data.experience}/>
			</Template1>
		{:else if openProjects}
			<Template1 pageTitle="projects" on:home={openHome} />
		{:else if openApps}
			<Template1 pageTitle="applications" on:home={openHome} />
		{:else if openRefBook}
			<Template1 pageTitle="references" on:home={openHome}>
				<AddressBook contacts={data.references} />
			</Template1>
		{:else if openGoals}
			<Template1 pageTitle="goals" on:home={openHome} />
		{:else}
			<Home data={data}
				bind:openEducation
				bind:openExp
				bind:openProjects
				bind:openApps
				bind:openRefBook
			/>
		{/if}
	{:else if showCreate}
		<CreateProfile on:profileCreated={() => showCreate = false} />
	{:else}
		<p>Loading...</p> <!--make this prettier-->
	{/if}
</main>

<style>
	main {
		background-color: #333643;
		min-height: 100vh;
		padding: 2.5rem 5rem;
	}
</style>
