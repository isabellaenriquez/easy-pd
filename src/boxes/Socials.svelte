<script lang="ts">
    export let socialData: {
        email: string,
        phone: number,
        linkedin?: string,
        github?: string,
        website?: string,
        twitter?: string,
        other: {
            name: string,
            src: string
        }[]
    };

    import { isUndefined } from '../globalFunctions';
    
    let otherLinks: { name: string, src: string }[];
    if (!isUndefined(socialData.other)) {
        otherLinks = socialData.other;
    }
</script>

<div id="social-box">
    <h2>socials</h2>
    <div id="social-links">
        <a href="mailto:{socialData.email}"><button><h3><i class="fas fa-envelope"></i>&nbsp;Email</h3></button></a>
        <button><h3><i class="fas fa-phone"></i> {socialData.phone}</h3></button>
        {#if !isUndefined(socialData.linkedin)}
            <a href={socialData.linkedin}><button><h3><i class="fab fa-linkedin"></i>&nbsp;Linkedin</h3></button></a>
        {/if}
        {#if !isUndefined(socialData.github)}
        <a href={socialData.github}><button><h3><i class="fab fa-github"></i>&nbsp;GitHub</h3></button></a>
        {/if}
        {#if !isUndefined(socialData.twitter)}
        <a href={socialData.twitter}><button><h3><i class="fab fa-twitter"></i>&nbsp;Twitter</h3></button></a>
        {/if}
        {#if !isUndefined(socialData.website)}
            <a href={socialData.website}><button><h3><i class="fas fa-desktop"></i>&nbsp;Website</h3></button></a>
        {/if}
        {#if !isUndefined(otherLinks)}
            {#each otherLinks as lnk}
                <a href={lnk.src}><button><h3><i class="fas fa-link"></i>&nbsp;{lnk.name}</h3></button></a>
            {/each}
        {/if}
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
        display: flex;
        flex-wrap: wrap;
    }

    button {
        padding: 0 1rem;
        margin: 0 1rem 0 0;
    }
</style>