<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    // template for education, experience, projects
    export let pageTitle: string;
    export let addUnit: string = null; // name of thing being added

    if (addUnit === null){
        addUnit = pageTitle; // ex. "add education"
    }

    const dispatch = createEventDispatcher();

    function goHome() {
        dispatch('home', {
            openedPage: pageTitle
        }); // send message to bring back home screen
    }

</script>

<main in:fly="{{ y: 2000, duration: 2000 }}" out:fade="{{ duration: 500 }}">
    <h1>{pageTitle}</h1>
    <button on:click="{goHome}">home</button>
    <button>add {addUnit}</button>
    <slot></slot>
</main>

<style>

</style>