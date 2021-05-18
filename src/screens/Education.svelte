<script lang="ts">
    import { capitalize, isUndefined } from '../globalFunctions';
	import { slide } from 'svelte/transition';
    export let educationData: educationElement[];

    type educationElement = {
        school: string;
        startYear: number;
        finalYear: number;
        degree?: {
            name: string;
            shortForm?: string;
        };
        cgpa?: number;
        courses?: string[];
        clubs?: string[][];
    };

    function addEducation() {
        let school: string = capitalize(
            (<HTMLInputElement>document.getElementById("school")).value
        );
        if (isUndefined(school)) {
            alert("Please fill in the school name!");
            return;
        }

        let startYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("startYear")).value
        );

        console.log(startYear);
        if (isUndefined(startYear)) {
            alert("Please indicate when you started at " + school + "!");
            return;
        }

        let finalYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("finalYear")).value
        );
        if (isUndefined(finalYear)) {
            alert("Please indicate when you finished/will finish at " + school +"!");
            return;
        }

        const newEducation: educationElement = {
            school: school,
            startYear: startYear,
            finalYear: finalYear
        };

        let degreeName: string = capitalize(
            (<HTMLInputElement>document.getElementById("degreeName")).value
        );
        if (!isUndefined(degreeName)) {
            newEducation.degree = {
                name: degreeName
            };
            let shortForm: string = (<HTMLInputElement>document.getElementById("shortForm")).value;
            if (!isUndefined(shortForm)) {
                newEducation.degree.shortForm = shortForm;
            }
        }

        let cgpa: number;
        cgpa = parseInt((<HTMLInputElement>document.getElementById("cgpa")).value);
        if (!isUndefined(cgpa)) {
            newEducation.cgpa = cgpa;
        }

        let courses: string[] = [];
        for (let i=0; i < numCourses; i++) {
            let course: string = (<HTMLInputElement>document.getElementById('course' + i)).value;
            courses.push(course);
        }
        newEducation.courses = courses;
        

        let clubs: string[][] = [];
        for (let i=0; i < numClubs; i++) {
            let position: string = (<HTMLInputElement>document.getElementById('position' + i)).value;
            let club: string = (<HTMLInputElement>document.getElementById('club' + i)).value;
            clubs.push([club, position]);
        }
        newEducation.clubs = clubs;

        if (isUndefined(educationData)){
            educationData = [newEducation];
        }else {
            educationData = [...educationData, newEducation]; // update DOM
        }
        fetch('./add/education', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newEducation)
        }).then(res => console.log(res));

        formVisible = false; // close form

        //reset values
        numCourses = 0;
        numClubs = 0;
    }

    let formVisible: boolean = false;
    let numCourses: number = 0;
    let numClubs: number = 0;
</script>

<div>
    <button on:click={() => (formVisible = !formVisible)}>
        {#if formVisible}
            cancel
        {:else}
            add education
        {/if}
    </button>
    {#if formVisible}
        <form transition:slide|local>
            <h2>new education</h2>
            <label for="school">School name</label>
            <input
                name="school"
                id="school"
                placeholder="Sky High..."
                required
            />
            <label for="startYear">Year started</label>
            <input
                name="startYear"
                id="startYear"
                type="number"
                placeholder="2021..."
                required
            />
            <label for="finalYear">Year finished</label>
            <input name="finalYear" id="finalYear" placeholder="2025..." required/>
            <label for="degreeName">Degree name</label>
            <input
                name="degreeName"
                id="degreeName"
                placeholder="Bachelor of Arts..."
            />
            <label for="shortForm">Degree short form</label>
            <input name="shortForm" id="shortForm" placeholder="BA..." />
            <label for="cgpa">Cummulative Grade Point Average</label>
            <input name="cgpa" id="cgpa" type="number" placeholder="4.0..." />
            <label for="courses[]">Courses</label>
            {#each {length: numCourses} as _, i}
                <input name="courses[]" id={"course" + i} placeholder="Intro to Programming..."/><br>
            {/each}
            <button type="button" on:click={() => numCourses += 1}>add a course</button>
            <label for="clubs[]">Extra-curricular activities</label>
            {#each Array(numClubs) as _, i}
                <input name="clubs[{i}][0]" id={"position" + i} placeholder="Director of Marketing..."/>
                <input name="clubs[{i}][1]" id={"club" + i} placeholder="Student Government..."/><br>
            {/each}
            <button type="button" on:click={() => numClubs += 1}>add an extra-curricular</button>
            <button type="button" on:click={addEducation}>finish</button>
        </form>
    {/if}
    
    {#if educationData}
        {#each educationData as e}
            <div class="education-info">
                <h2>
                    {e.school}
                </h2>
                {#if e.degree}
                    <p>
                        <i>
                            {e.degree.name}
                            {#if e.degree.shortForm && e.degree.shortForm !== ""}
                                — {e.degree.shortForm}
                            {/if}
                        </i>
                        •
                        {e.startYear} - {e.finalYear}
                    </p>
                {/if}
                {#if e.cgpa}
                    CGPA: {e.cgpa}
                {/if}
            </div>
            <div class="education-extra">
                <div class="courses">
                    <h3>Coursework</h3>
                    <ul>
                        {#if e.courses}
                            {#each e.courses as c}
                                <li>{c}</li>
                            {:else}
                                <li>No courses listed.</li>
                            {/each}
                        {/if}
                    </ul>
                </div>
                <div class="clubs">
                    <h3>Extra-curricular activities</h3>
                    <ul>
                        {#if e.clubs}
                            {#each e.clubs as c}
                                <li>{c[1]} @ {c[0]}</li>
                            {:else}
                                <li>No clubs listed.</li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            </div>
        {/each}
    {:else}
        <p>No education listed.</p>
    {/if}
</div>

<style>
    .education-info {
        background-color: #525972;
        margin: 0.5rem 0;
        padding: 1rem;
        border-radius: 1rem;
    }

    .education-extra {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
    }

    .education-extra div {
        background-color: #9686a3;
        margin: 0.5rem 0;
        padding: 1rem;
        border-radius: 1rem;
    }

    h2,
    h3 {
        margin: 0;
    }
</style>
