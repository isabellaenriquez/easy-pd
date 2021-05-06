<script lang="ts">
    export let name: string;
    export let title: string = null;
    export let alt: string = null; // alt text for icon
    export let src: string = "images/" + name + ".svg"; // path to icon

    if (title === null){
        title = name;
    }

    if (src !== null && alt === null){
        alt = "An icon representing the " + name + " category."; // default alt text if none set
    }

    let boxID: string = name + "-box";
</script>

<main>
    <div id={boxID}>
        {#if src !== null}
        <img id={name + "-img"} {alt} {src}>
        {/if}
        <h2>{title}</h2>
    </div>
</main>

<style>
    div {
        background-color: #525972;
        border-radius: 1rem;
        margin: 1rem 1rem 0 0;
        padding: 1rem;
        text-align: center;
        display: flex;
        height: 25vh;
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
    #education-img, #projects-img, #experience-img { /**consider making this stylesheet sass so i dont have to do this*/
        height: 40%;
    }
    #notes-img {
        width: 40%;
    }
</style>