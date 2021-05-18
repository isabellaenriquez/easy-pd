<script lang="ts">
	import Template1 from "./screens/Template1.svelte";
	import Home from "./screens/Home.svelte";
	import AddressBook from "./screens/AddressBook.svelte";
	import Education from "./screens/Education.svelte";
	import { onMount } from "svelte";
	import { isUndefined } from "./globalFunctions";
	import Experience from "./screens/Experience.svelte";
	import CreateProfile from "./screens/CreateProfile.svelte";
	import Projects from "./screens/Projects.svelte";

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

	onMount(async () => {
		const res = await fetch("./data");
		data = await res.json();

		if (isUndefined(data)) {
			showCreate = true;
		} else {
			loaded = true;
		}
	});
</script>

<main>
	{#if loaded}
		{#if openEducation}
			<Template1 pageTitle="education" on:home={openHome}>
				<Education educationData={data.education} />
			</Template1>
		{:else if openExp}
			<Template1 pageTitle="experience" on:home={openHome}>
				<Experience expData={data.experience} />
			</Template1>
		{:else if openProjects}
			<Template1 pageTitle="projects" on:home={openHome}>
				<Projects projectData={data.projects} />
			</Template1>
		{:else if openApps}
			<Template1 pageTitle="applications" on:home={openHome} />
		{:else if openRefBook}
			<Template1 pageTitle="references" on:home={openHome}>
				<AddressBook contacts={data.references} />
			</Template1>
		{:else if openGoals}
			<Template1 pageTitle="goals" on:home={openHome} />
		{:else}
			<Home
				{data}
				bind:openEducation
				bind:openExp
				bind:openProjects
				bind:openApps
				bind:openRefBook
			/>
		{/if}
	{:else if showCreate}
		<CreateProfile on:profileCreated={() => (showCreate = false)} />
	{:else}
		<div id="loading">
			<h1 class="typing">Loading...</h1>
		</div>
	{/if}
</main>

<style>
	main {
		background-color: #333643;
		min-height: 100vh;
		padding: 2.5rem 5rem;
	}

	#loading {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.typing {
		overflow: hidden; /* Ensures the content is not revealed until the animation */
		border-right: 0.15em solid #9686A3; /* The typwriter cursor */
		white-space: nowrap; /* Keeps the content on a single line */
		margin: 0 auto; /* Gives that scrolling effect as the typing happens */
		letter-spacing: 0.15em; /* Adjust as needed */
		animation: typing-animation 5s steps(40, end), blink-caret 0.5s step-end infinite;
	}

	/* The typing effect */
	@keyframes typing-animation {
		0% {
			width: 0;
		}
		100% {
			width: 10em;
		}
	}

	/* The typewriter cursor effect */
	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: #9686A3;
		}
	}
</style>
