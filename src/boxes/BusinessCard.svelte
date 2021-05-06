<script lang="ts">
    export let name: string;
    export let title: string;
    export let education: string;
    export let alt: string = null; // alt text for icon
    export let src: string = null; // link to pic
    export let status: number;
    export let headline: string = null;

    if (src !== null && alt === null){
        alt = "A picture of " + name + "."; // default alt text if none set
    }

    let colour: string;
    let statusString: string;
    switch(status){
        case 1: 
            colour = "green";
            statusString = "Actively looking for work";
            break;
        case 2:
            colour = "yellow";
            statusString = "Casually looking for work";
            break;
        case 3:
            colour = "red";
            statusString = "Happily employed";
            break;
        case 4:
            colour = "grey";
            statusString = "Unemployed and happy";
            break;
    }

    window.addEventListener("resize", resizeHeadshot);
    document.addEventListener("DOMContentLoaded", resizeHeadshot);

    function resizeHeadshot(){
        let headshot = document.getElementById("headshot");
        headshot.style.height = "0";
        let infoDiv = document.getElementById("info");
        let infoHeight = infoDiv.clientHeight;
        let headshotHeight = infoHeight + (infoHeight/4);
        console.log(infoHeight);
        headshot.style.height = headshotHeight + "px";
    }
</script>

<main>
    <div id="outer">
        <div class="inner">
            <div>
                {#if src !== null}
                <img id="headshot" {alt} {src}>
                {/if}
            </div>
            <div id="info">
                <h2>{name}</h2>
                <p>{title}</p>
                <p>{education}</p>
            </div>
            <button id="edit">Edit</button>
        </div>
        <div id="second" class="inner">
            <div id="headline">
            {#if headline === null}
                <button>Set headline</button>
            {:else}
                <p>{headline}</p>
            {/if}
            </div>
            <div id="status">
                <i class="fas fa-circle" style="color: {colour}"></i>
                {statusString}
            </div>
        </div>
    </div>
</main>

<style>
    img {
        border-radius: 50%;
        height: 0;
        margin: 0 1rem 0 0;
    }
    #outer {
        background-color: #525972;
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem;
    }
    h2 {
        color: white;
        margin-bottom: 0rem;
    }
    p {
        font-style: italic;
        margin: 0;
    }
    #status {
        background-color: #9686A3;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    .inner {
        display: flex;
        margin: 0.5rem;
        position: relative;
    }
    #second {
        justify-content: space-between;
    }
    #status {
        min-width: 40%;
    }
    #edit {
        min-width: 10%;
        height: 2rem;
        position: absolute;
        right: 0rem;
    }
</style>