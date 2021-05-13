<script lang="ts">
    export let info: {
        firstName: string,
        lastName: string,
        title?: string,
        relation?: string,
        email?: string,
        phone?: number,
        dateAdded: Date
    }

</script>

<div class="contact-card">
    <div class="contact-header">
        <h2>{info.firstName} {info.lastName} </h2>
        <p> — {info.title}</p>
    </div>
    <p>Relationship: {info.relation}</p>
    {#if info.email !== "" || info.phone !== null}
        <h3>Contact information</h3>
        <a href="mailto:{info.email}">{info.email}</a>
        {#if info.phone !== NaN && info.phone !== null}
            <p>Phone: {info.phone}</p>
        {/if}
    {/if}
    <p class="date-added">Added: {info.dateAdded}</p>
</div>

<style>
    .date-added {
        color: #9686A3;
        font-style: italic;
        font-size: small;
    }

    .contact-card {
        background-color: #525972;
        padding: 1rem;
        border-radius: 1rem;
        margin: 0.5rem 0;
    }

    .contact-header {
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        margin: 0;
        padding: 0;
    }

    h2, h3 {
        margin: 0;
    }

    p {
        margin: 0.5rem 0;
    }
</style>