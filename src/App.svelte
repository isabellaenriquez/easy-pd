<script lang="ts">
    //import { fade } from 'svelte/transition';
	import Template1 from './screens/Template1.svelte';
	import Home from './screens/Home.svelte';

	let openEducation: boolean = false;
	let openExp: boolean = false;
	let openProjects: boolean = false;
	let openNotes: boolean = false;
	let openRefBook: boolean = false;
	let openGoals: boolean = false;
	
	function openHome(){
		if (openEducation){
			openEducation = false;
		}else if (openExp){
			openExp = false;
		}else if (openProjects){
			openProjects = false;
		}else if (openNotes){
			openNotes = false;
		}else if (openRefBook){
			openRefBook = false;
		}else if (openGoals){
			openGoals = false;
		}
	}
</script>

<main>
	{#if openEducation}
		<Template1 pageTitle="education" on:home={openHome}/>
	{:else if openExp}
		<Template1 pageTitle="experience" on:home={openHome}/>
	{:else if openProjects}
		<Template1 pageTitle="projects" addUnit="project" on:home={openHome}/>
	{:else if openNotes}
		<Template1 pageTitle="notes" addUnit="note" on:home={openHome}/>
	{:else if openRefBook}
		<Template1 pageTitle="references" addUnit="reference" on:home={openHome}/>
	{:else if openGoals}
		<Template1 pageTitle="goals" addUnit="goal" on:home={openHome}/>
	{:else}
		<Home bind:openEducation={openEducation} bind:openExp={openExp} bind:openProjects={openProjects} bind:openNotes={openNotes}/>
	{/if}
</main>

<style>
	main {
		background-color: #333643;
		min-height: 100vh;
		padding: 2.5rem;
	}

</style>