<script lang="ts">
    
    // template for education, experience, projects

    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    export let pageTitle: string;

    const dispatch = createEventDispatcher();

    function goHome() {
        dispatch("home", {
            openedPage: pageTitle,
        }); // send message to bring back home screen
    }
</script>

<main in:fade={{ duration: 500, delay: 750 }} out:fade="{{ duration: 500 }}">
    <div class="header">
        <h1>{pageTitle}</h1>
        <button on:click={goHome}><i class="fas fa-home"></i></button>
    </div>
    <slot />
</main>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
</style>
