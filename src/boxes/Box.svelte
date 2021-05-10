<script lang="ts">
    export let name: string;
    export let title: string = null;
    export let alt: string = null; // alt text for icon
    export let src: string = "images/" + name + ".svg"; // path to icon
    export let isOpen: boolean = false;

    if (title === null){
        title = name;
    }

    if (src !== null && alt === null){
        alt = "An icon representing the " + name + " category."; // default alt text if none set
    }

    let boxID: string = name + "-box";
</script>

<main>
    <div class="outer-box">
        <div id={boxID}>
            {#if src !== null}
            <img id={name + "-img"} {alt} {src}>
            {/if}
            <h2>{title}</h2>
        </div>
        <button on:click="{() => isOpen = true}">open</button>
    </div>
</main>

<style>
    .outer-box {
        background-color: #525972;
        border-radius: 1rem;
        margin: 1rem 1rem 0 0;
        padding: 1rem;
        height: 20vh;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    div {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2 {
        margin: 0 0.5rem;
    }
    #education-box {
        flex-direction: column;
    }
    #experience-box {
        flex-direction: row;
    }
    #projects-box {
        flex-direction: row-reverse;
    }
    #notes-box {
        flex-direction: column-reverse;
    }
    #experience-img, #projects-img { /**consider making this stylesheet sass so i dont have to do this*/
        height: 80%;
    }
    #education-img {
        width: 40%;
    }
    #notes-img {
        width: 70%;
    }
    button {
        margin: 0.5rem;
    }
</style>