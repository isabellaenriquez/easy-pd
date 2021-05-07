<script lang="ts">
    export let info: {
        firstName: string,
        lastName: string,
        title?: string,
        relation?: string,
        email?: string,
        phone?: number,
        notes?: string,
        dateAdded: Date
    }

</script>

<div class="contact-card">
    <h2>{info.firstName} {info.lastName}</h2>
    <h4>{info.title} || {info.relation}</h4>
    <h3>Contact information</h3>
    <a href="mailto:{info.email}">{info.email}</a>
    <p>{info.phone}</p>
    <h3>Notes</h3>
    <p>{info.notes}</p>
    <p class="date-added">{info.dateAdded}</p>
</div>

<style>
    .date-added {
        color: #9686A3;
        font-style: italic;
        font-size: small;
    }
    h4 {
        font-style: italic;
    }
</style>