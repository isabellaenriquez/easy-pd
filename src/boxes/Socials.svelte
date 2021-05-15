<script lang="ts">
    export let socialData: {
        linkedin?: string,
        github?: string,
        website?: string,
        twitter?: string,
        other?: {
            name: string,
            src: string
        }[]
    };

    import { isUndefined } from '../globalFunctions';
</script>

<div id="social-box">
    <h2>socials</h2>
    <div id="social-links">
        {#if !isUndefined(socialData.linkedin)}
            <h3><i class="fab fa-linkedin"></i>&nbsp;<a href={socialData.linkedin}>Linkedin</a></h3>
        {/if}
        {#if !isUndefined(socialData.github)}
            <h3><i class="fab fa-github"></i>&nbsp;<a href={socialData.github}> GitHub</a></h3>
        {/if}
        {#if !isUndefined(socialData.twitter)}
            <h3><i class="fab fa-twitter"></i>&nbsp;<a href={socialData.twitter}> Twitter</a></h3>
        {/if}
        {#if !isUndefined(socialData.website)}
            <h3><i class="fas fa-desktop"></i>&nbsp;<a href={socialData.website}> Website</a></h3>
        {/if}
        <!--fix this
        {#if !isUndefined(socialData.other)}
            {#each socialData.other as lnk}
                <h3><i class="fas fa-link"></i>&nbsp;<a href={lnk.src}> {lnk.name}</a></h3>
            {/each}
        {/if}
        -->
    </div>
</div>

<style>
    #social-box {
        background-color: #525972;
        border-radius: 1rem;
        padding: 2.5rem;
        margin: 1rem 0.5rem 0.5rem;
    }

    #social-links {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
</style>