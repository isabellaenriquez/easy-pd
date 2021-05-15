<script lang="ts">
    import { capitalize, isUndefined } from '../globalFunctions';
    export let expData: expElement[];

    type expElement = {
        org: string,
        startYear: number,
        finalYear?: number,
        position: string,
        notes?: string
    };

    function addExp() {
        let org: string = capitalize(
            (<HTMLInputElement>document.getElementById("org")).value
        );
        if (isUndefined(org)) {
            alert("Please fill in the organization name!");
            return;
        }

        let startYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("startYear")).value
        );

        console.log(startYear);
        if (isUndefined(startYear)) {
            alert("Please indicate when you started at " + org + "!");
            return;
        }

        let position: string = capitalize(
            (<HTMLInputElement>document.getElementById("position")).value
        );

        const newExp: expElement = {
            org: org,
            startYear: startYear,
            position: position
        };

        let finalYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("finalYear")).value
        );
        if (finalYear < startYear) {
            alert("Please indicate a valid final year!");
            return;
        }else if (!isUndefined(finalYear)){
            newExp.finalYear = finalYear;
        }

        let notes: string = (<HTMLInputElement>document.getElementById("notes")).value;
        if (!isUndefined(notes)) {
            newExp.notes = notes;
        }

        expData = [...expData, newExp]; // update DOM

        fetch('./add/experience', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newExp)
        }).then(res => console.log(res));

        formVisible = false; // close form
    }

    let formVisible: boolean = false;
</script>

<div>
    <button on:click={() => (formVisible = !formVisible)}>
        {#if formVisible}
            cancel
        {:else}
            add experience
        {/if}
    </button>
    {#if formVisible}
        <form>
            <h2>new experience</h2>
            <label for="org">Organization name</label>
            <input
                name="org"
                id="org"
                placeholder="Krusty Krab..."
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
            <label for="finalYear">Year finished (leave blank if current)</label>
            <input name="finalYear" id="finalYear" placeholder="2025..."/>
            <label for="position">Position title</label>
            <input
                name="position"
                id="position"
                placeholder="Fry Cook..."
                required
            />
            <label for="notes">Notes</label>
            <textarea name="notes" id="notes" placeholder="Awarded Employee of the Month 3 times..."></textarea>
            <button type="button" on:click={addExp}>finish</button>
        </form>
    {/if}

    <div id="experiences">
        {#each expData as e}
            <div class="exp-info">
                <h2>
                    {e.org}
                </h2>
                <p>
                    {e.position} • {e.startYear} — 
                    {#if e.finalYear}
                        {e.finalYear}
                    {:else}
                        Present
                    {/if}
                </p>
                {#if e.notes}
                    <h4>Notes</h4>
                    <p>{e.notes}</p>
                {/if}
            </div>
        {:else}
            <p>No experience listed.</p>
        {/each}
    </div>
</div>

<style>
    .exp-info {
        background-color: #525972;
        margin: 0.5rem 0;
        padding: 1rem;
        border-radius: 1rem;
    }

    #experiences {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
    }

    h2,h4 {
        margin: 0;
    }
</style>
