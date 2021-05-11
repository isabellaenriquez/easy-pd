<script lang="ts">
    //import { fade } from 'svelte/transition';
	import Template1 from './screens/Template1.svelte';
	import Home from './screens/Home.svelte';
import AddressBook from './screens/AddressBook.svelte';

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

	// for testing
	let tempContacts = [{
		firstName: "Isabella",
		lastName: "Enriquez",
		title: "Developer",
		relation: "Former supervisor",
		email: "18ipe@queensu.ca",
		phone: 123456789,
		dateAdded: new Date()
	}, {
        firstName: "Heinz",
		lastName: "Doofenshmirtz",
		title: "Founder of Doofenshmirtz Evil Inc.",
		relation: "Former supervisor",
		email: "heinz@doof.inc",
		phone: 987654321,
		dateAdded: new Date()
    }, {
        firstName: "Tina",
		lastName: "Belcher",
		title: "Employee @ Bob\'s Burgers",
		relation: "Former supervisor",
		email: "tinabeana@wharfmail.com",
		phone: 34567,
		dateAdded: new Date()
    }];
</script>

<main>
	{#if openEducation}
		<Template1 pageTitle="education" on:home={openHome}/>
	{:else if openExp}
		<Template1 pageTitle="experience" on:home={openHome}/>
	{:else if openProjects}
		<Template1 pageTitle="projects" on:home={openHome}/>
	{:else if openNotes}
		<Template1 pageTitle="notes" on:home={openHome}/>
	{:else if openRefBook}
		<Template1 pageTitle="references" on:home={openHome}>
			<AddressBook contacts={tempContacts}/>
		</Template1>
	{:else if openGoals}
		<Template1 pageTitle="goals" on:home={openHome}/>
	{:else}
		<Home bind:openEducation={openEducation} bind:openExp={openExp} bind:openProjects={openProjects} bind:openNotes={openNotes} bind:openRefBook={openRefBook}/>
	{/if}
</main>

<style>
	main {
		background-color: #333643;
		min-height: 100vh;
		padding: 2.5rem;
	}

</style>