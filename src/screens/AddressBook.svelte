<script lang="ts">
    import Contact from '../boxes/Contact.svelte';

    export let contacts: contactInfo[];

    type contactInfo = {
        firstName: string,
        lastName: string,
        title?: string,
        relation?: string,
        email?: string,
        phone?: number,
        notes?: string,
        dateAdded: Date
    }

    let sortMethod: string = "dateAdded"; // selected sort method

    let sortedContacts = contacts;

    // sort by specified sort method
    function sortContactsByKey() {
        console.log('resorting');
        sortedContacts = sortedContacts.sort(function(a: {}, b: {}) {
            return (a[sortMethod] < b[sortMethod] ? -1: 1)
        });
    }

    function addContact() {
        formVisible = false; // close form
        let firstName: string = (<HTMLInputElement>document.getElementById("firstName")).value;
        let lastName: string = (<HTMLInputElement>document.getElementById("lastName")).value;
        let date: Date = new Date();
        const newContact: contactInfo = {
            firstName: firstName,
            lastName: lastName,
            dateAdded: date
        };

        let title: string = (<HTMLInputElement>document.getElementById("title")).value;
        if (title !== null && title !== undefined) {
            newContact.title = title
        }
        let relation: string =  (<HTMLInputElement>document.getElementById("relation")).value;
        if (relation !== null && relation !== undefined) {
            newContact.relation = relation;
        }

        let email: string = (<HTMLInputElement>document.getElementById("email")).value;
        if (email !== null && email !== undefined) {
            newContact.email = email;
        }
        let phone: number = parseInt((<HTMLInputElement>document.getElementById("phone")).value);
        if (phone !== null && phone !== undefined){
            newContact.phone = phone;
        }

        sortedContacts = [...sortedContacts, newContact];
        sortContactsByKey(); // resort

        // save to json
        let newData = {
            "firstName": firstName,
            "lastName": lastName,
            "title": title,
            "relation": relation,
            "email": email,
            "phone": phone,
            "dateAdded": date
        } 

        fetch('http://127.0.0.1:8000/add/references', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newData)
        }).then(res => console.log(res))

    }

    let formVisible: boolean = false;

</script>

<div>
    <label for="sortMethod">Sort by:</label>
    <select name="sortMethod" id="sortSelect" bind:value={sortMethod} on:blur="{sortContactsByKey}">
        <option value="firstName">First name</option>
        <option value="lastName">Last name</option>
        <option value="dateAdded">Date added</option>
    </select>
    <button name="addReference" on:click="{() => formVisible = !formVisible}">
        {#if formVisible}
            Cancel
        {:else}
            Add new reference
        {/if}
    </button>
    {#if formVisible}
    <form>
        <h2>new reference</h2>
        <label for="firstName">First name</label>
        <input name="firstName" id="firstName" placeholder="Isabella..." required>
        <label for="lastName">Last name</label>
        <input name="lastName" id="lastName" placeholder="Enriquez..." required>
        <label for="title">Job title</label>
        <input name="title" id="title" placeholder="Founder of easyPD...">
        <label for="relation">Relation</label>
        <input name="relation" id="relation" placeholder="Former supervisor...">
        <label for="email">Email</label>
        <input name="email" id="email" type="email" placeholder="123@fakemail.com...">
        <label for="phone">Phone</label>
        <input name="phone" id="phone" type="number" placeholder="1234567899...">
    </form>
    <button type="submit" on:click={addContact}>Add</button>
    {/if}
    {#each sortedContacts as contact}
        <Contact info={contact}/>
    {/each}
</div>

<style>
</style>
