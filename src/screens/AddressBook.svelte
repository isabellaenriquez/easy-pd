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
        dateAdded: Date
    }

    let sortMethod: string = "dateAdded"; // selected sort method

    let sortedContacts = contacts;

    // sort by specified sort method
    function sortContactsByKey() {
        console.log('resorting');
        sortedContacts = sortedContacts.sort(function(a: contactInfo | any, b: contactInfo | any): number { // perhaps this is dangerous (the "any")
            return (a[sortMethod] < b[sortMethod] ? -1: 1)
        });
    }

    // capitalize a word
    function capitalize(aString: string): string {
        return aString.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }

    function isEmail(emailInput: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // will not work for emails that don't have dots or that have spaces
        return re.test(emailInput.toLowerCase());
    }

    function addContact() {
        let firstName: string = capitalize((<HTMLInputElement>document.getElementById("firstName")).value);
        if (firstName === undefined || firstName === null || firstName === ''){
            alert("Please fill in a first name!");
            return;
        }
        let lastName: string = capitalize((<HTMLInputElement>document.getElementById("lastName")).value);
        if (lastName === undefined || lastName === null || lastName === ''){
            alert("Please fill in a last name!");
            return;
        }
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
            if (isEmail(email))
                newContact.email = email;
            else {
                alert("Please enter a valid email!");
                return;
            }
        }
        let phone: number = parseInt((<HTMLInputElement>document.getElementById("phone")).value);
        if (phone !== null && phone !== undefined){
            newContact.phone = phone;
        }

        sortedContacts = [...sortedContacts, newContact];
        sortContactsByKey(); // resort

        fetch('./add/references', {
            method: 'POST', 
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newContact)
        }).then(res => console.log(res));

        formVisible = false; // close form

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
            cancel
        {:else}
            add new reference
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
        <button type="submit" on:click={addContact}>add</button>
    </form>
    {/if}
    <div id="contacts">
        {#each sortedContacts as contact}
            <Contact info={contact}/>
        {:else}
            <p>No contacts found.</p>
        {/each}
    </div>
</div>

<style>
    #contacts {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
    }
</style>
