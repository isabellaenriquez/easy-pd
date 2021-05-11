<script lang="ts">
    import { getContext } from "svelte";
    import AddressBook from "../screens/AddressBook.svelte";
    const { open } = getContext('simple-modal');


    let tempContacts = [{
		firstName: "Isabella",
		lastName: "Enriquez",
		title: "Developer",
		relation: "Former supervisor",
		email: "18ipe@queensu.ca",
		phone: 123456789,
		dateAdded: new Date()
	}, {
        firstName: "Heinz",
		lastName: "Doofenshmirtz",
		title: "Founder of Doofenshmirtz Evil Inc.",
		relation: "Former supervisor",
		email: "heinz@doof.inc",
		phone: 987654321,
		dateAdded: new Date()
    }, {
        firstName: "Tina",
		lastName: "Belcher",
		title: "Employee @ Bob\'s Burgers",
		relation: "Former supervisor",
		email: "tinabeana@wharfmail.com",
		phone: 34567,
		dateAdded: new Date()
    }];

    const handlePageOpen = () => {
        console.log('opening references');
        open(AddressBook, { contacts: tempContacts}, 
            { closeButton: false, 
				styleBg: {
					background: 'rgba(0, 0, 0, 0.66)'
				},
                styleWindow: {
                    background: '#525972'
                },
                styleContent: {
                    padding: '2.5rem'
                }
             });
    }
    

</script>

<div>
    <img src="images/references.svg" alt="A simple icon of a person to represent a contact book.">
    <h2>reference address book</h2>
    <button on:click="{handlePageOpen}">Open</button>
</div>

<style>
    div {
        background-color: #525972;
        border-radius: 1rem;
        padding: 2.5rem;
        margin: 1rem;
        text-align: center;
    }
    img {
        height: 30vh;
    }
</style>