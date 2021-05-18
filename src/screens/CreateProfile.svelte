<script lang="ts">
    import { capitalize, isEmail, isUndefined } from "../globalFunctions";
    import { createEventDispatcher } from "svelte";

    type initialProfile = {
        firstName: string,
        lastName: string,
        position: string,
        statusNum: number, 
        headline?: string,
        socials: {
            email: string,
            phone: number,
            linkedin?: string,
            github?: string,
            website?: string,
            other: {
                name: string,
                src: string
            }[]
        }
    };

    let numExtralinks: number = 0;

    function createUserProfile() {
        let firstName: string = capitalize((<HTMLInputElement>document.getElementById("firstName")).value);
        if (isUndefined(firstName)){
            alert("Please fill in your first name!");
            return;
        }

        let lastName: string = capitalize((<HTMLInputElement>document.getElementById("lastName")).value);
        if (isUndefined(lastName)){
            alert("Please fill in your last name!");
            return;
        }

        let position: string = (<HTMLInputElement>document.getElementById("position")).value;
        if (isUndefined(position)){
            alert("Please fill in your current position (i.e. Developer, Student, Unemployed, etc.)!");
            return;
        }

        let statusNum: number = parseInt((<HTMLInputElement>document.getElementById("statusNum")).value);
        if (isUndefined(statusNum)){
            alert("Please choose your status!");
            return;
        }

        let email: string = (<HTMLInputElement>document.getElementById("email")).value;
        if (isUndefined(email) || !isEmail(email)) {
            alert("Please enter a valid email!");
            return;
        }

        let phone: number = parseInt((<HTMLInputElement>document.getElementById("phone")).value);
        if (isUndefined(phone)) {
            alert("Please enter a phone number!");
            return;
        }

        let userProfile: initialProfile = {
            firstName: firstName,
            lastName: lastName,
            position: position,
            statusNum: statusNum,
            socials: {
                email: email,
                phone: phone,
                other: []
            }
        };

        let headline: string = capitalize((<HTMLInputElement>document.getElementById("headline")).value);
        if (!isUndefined(headline)){
            userProfile.headline = headline;
        }

        let linkedin: string = (<HTMLInputElement>document.getElementById("linkedin")).value;
        if (!isUndefined(linkedin)) {
            userProfile.socials.linkedin = linkedin;
        }

        let github: string = (<HTMLInputElement>document.getElementById("github")).value;
        if (!isUndefined(github)) {
            userProfile.socials.github = github;
        }

        let website: string = (<HTMLInputElement>document.getElementById("website")).value;
        if (!isUndefined(website)) {
            userProfile.socials.website = website;
        }

        let otherLinks: {name: string, src: string}[] = [];
        for (let i=0; i < numExtralinks; i++) {
            let lnkName: string = (<HTMLInputElement>document.getElementById('linkName' + i)).value;
            let lnkSrc: string = (<HTMLInputElement>document.getElementById('linkSrc' + i)).value;
            otherLinks.push({name: lnkName, src: lnkSrc});
        }

        userProfile.socials.other = otherLinks;
        fetch('./create', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(userProfile)
        }).then(res => console.log(res));

        const dispatch = createEventDispatcher();
        dispatch("profileCreated");

    }
</script>

<main>
    <form>
        <h3>Basic information</h3>
        <label for="firstName">First name</label>
        <input name="firstName" id="firstName" placeholder="Isabella..." required>
        <label for="lastName">Last name</label>
        <input name="lastName" id="lastName" placeholder="Enriquez..." required>
        <label for="position">Current position</label>
        <input name="position" id="position" placeholder="Frontend Developer..." required>
        <label for="headline">Headline</label>
        <input name="headline" id="headline" placeholder="A really inspirational quote...">
        <label for="statusNum">Work status</label>
        <select name="statusNum" id="statusNum" required>
            <option value={1}>Actively looking for work</option>
            <option value={2}>Casually looking for work</option>
            <option value={3}>Not looking for work</option>
            <option value={4}>Student</option>
        </select>
        <h3>Socials</h3>
        <label for="email">Email</label>
        <input name="email" id="email" placeholder="18ipe@queensu.ca..." type="email" required>
        <label for="phone">Phone</label>
        <input name="phone" id="phone" placeholder="123456789" type="number" required> 
        <label for="linkedin">Linkedin</label>
        <input name="linkedin" id="linkedin" placeholder="https://linkedin.com/in/isabellaenriquez..." type="url">
        <label for="github">GitHub</label>
        <input name="github" id="github" placeholder="https://github.com/isabellaenriquez..." type="url">
        <label for="website">Personal website</label>
        <input name="website" id="website" placeholder="https://isabellaenriquez.github.io..." type="url">
        <label for="other[]">Other socials</label>
        {#each {length: numExtralinks} as _, i}
            <input name="other[{i}][0]" id={"linkName" + i} placeholder="Devpost...">
            <input name="other[{i}][1]" id={"linkSrc" + i} type="url" placeholder="https://devpost.com/isabellaenriquez...">
        {/each}
        <button type="button" on:click={() => numExtralinks += 1}>add social</button>
        <button type="button" on:click={createUserProfile}>finish</button>
    </form>
</main>