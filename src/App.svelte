<script lang="ts">
	import BusinessCard from './boxes/BusinessCard.svelte';
	import Box from './boxes/Box.svelte';
	import References from './boxes/References.svelte';
	import Goals from './boxes/Goals.svelte';
</script>

<main>
	<h1>easyPD</h1>
	<div id="boxes">
		<div id="left-boxes">
			<BusinessCard 
				name="Isabella Enriquez" title="Frontend Developer"
				src="https://media-exp1.licdn.com/dms/image/C5603AQHcMyh8xk8pXA/profile-displayphoto-shrink_800_800/0/1606009294022?e=1625702400&v=beta&t=IIiczs8SZcUt5iwtRgi0TDa6TpxCgQGerIiytX7qLrY"
				education="BCmpH, Queen's University '23"
				headline="I code to solve problems and beautify digital environments."
				status={3}
			/>
			<References/>
		</div>
		<div id="right-boxes">
			<div id="right-row-1">
				<Box name="education"/>
				<Box name="experience"/>
			</div>
			<div id="right-row-2">
				<Box name="projects"/>
				<Box name="notes"/>
			</div>
			<Goals/>
		</div>

	</div>
</main>

<style>
	main {
		background-color: #333643;
		min-height: 100vh;
		padding: 2.5rem;
	}

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