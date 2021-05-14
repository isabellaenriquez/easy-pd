<script lang="ts">
    export let name: string;
    export let title: string = "";
    export let alt: string = ""; // alt text for icon
    export let src: string = "images/" + name + ".svg"; // path to icon
    export let isOpen: boolean = false;

    import { isUndefined } from '../globalFunctions';


    if (isUndefined(title)){
        title = name;
    }

    // there's an image src but no alt text set
    if ((!isUndefined(src)) && (isUndefined(alt))){
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
        margin: 0.5rem;
        padding: 1rem;
        min-height: 20vh;
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
    #references-box {
        flex-direction: column;
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
    #applications-box {
        flex-direction: column-reverse;
    }
    img {
        margin: 0.5rem;
        width: 30%;
    }
    #references-img, #applications-img {
        width: 80%;
    }
    button {
        margin: 0.5rem;
    }
</style>