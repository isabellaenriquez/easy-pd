<script lang="ts">
    import { isUndefined } from "../globalFunctions";
	import { slide } from 'svelte/transition';

    export let projectData: project[];

    type project = {
        name: string;
        startYear: number;
        finishYear?: number;
        description?: string;
        tools: string[];
        team: string[];
        links: {
            name: string;
            src: string;
        }[];
    };

    function addProject() {
        let projectName: string = (<HTMLInputElement>(
            document.getElementById("projectName")
        )).value;
        if (isUndefined(projectName)) {
            alert("Please fill in the name of the project!");
            return;
        }

        let startYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("startYear")).value
        );
        if (isUndefined(startYear)) {
            alert("Please indicate when you started " + projectName + "!");
            return;
        }

        let newProject: project = {
            name: projectName,
            startYear: startYear,
            tools: [],
            team: [],
            links: [],
        };

        let finishYear: number = parseInt(
            (<HTMLInputElement>document.getElementById("finishYear")).value
        );
        if (!isUndefined(finishYear)) {
            newProject.finishYear = finishYear;
        }

        let description: string = (<HTMLInputElement>(
            document.getElementById("description")
        )).value;
        if (!isUndefined(description)) {
            newProject.description = description;
        }

        let toolsAsString: string = (<HTMLInputElement>(
            document.getElementById("tools")
        )).value;
        if (!isUndefined(toolsAsString)) {
            let tools: string[] = toolsAsString.split(",");
            newProject.tools = tools;
        }

        let teamAsString: string = (<HTMLInputElement>(
            document.getElementById("team")
        )).value;
        if (!isUndefined(teamAsString)) {
            let team: string[] = teamAsString.split(",");
            newProject.team = team;
        }

        let links: { name: string; src: string }[] = [];
        for (let i = 0; i < numLinks; i++) {
            let linkName: string = (<HTMLInputElement>(
                document.getElementById("linkName" + i)
            )).value;
            let linkSrc: string = (<HTMLInputElement>(
                document.getElementById("linkSrc" + i)
            )).value;
            if (
                (isUndefined(linkName) && !isUndefined(linkSrc)) ||
                (isUndefined(linkSrc) && !isUndefined(linkName))
            ) {
                alert(
                    "Please fill in all the fields for the link you're trying to add!"
                );
                return;
            } else if (isUndefined(linkName) && isUndefined(linkSrc)) {
                continue; // skip over
            }
            links.push({ name: linkName, src: linkSrc });
        }
        newProject.links = links;

        if (isUndefined(projectData)) {
            projectData = [newProject];
        } else {
            projectData = [...projectData, newProject];
        }

        fetch("./add/projects", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(newProject),
        }).then((res) => console.log(res));

        formVisible = false;
        numLinks = 0; // reset
    }

    let numLinks: number = 0;
    let formVisible: boolean = false;
</script>

<div>
    <button on:click={() => (formVisible = !formVisible)}>
        {#if formVisible}
            cancel
        {:else}
            add project
        {/if}
    </button>
    {#if formVisible}
        <form transition:slide|local>
            <h2>new project</h2>
            <label for="projectName">Project name</label>
            <input
                name="projectName"
                id="projectName"
                placeholder="easyPD..."
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
            <label for="finishYear"
                >Year finished (leave blank if on-going)</label
            >
            <input name="finishYear" id="finishYear" placeholder="2025..." />
            <label for="description">Description</label>
            <textarea
                name="description"
                id="description"
                placeholder="A Svelte-powered dashboard making professional development easy peazy lemon squeezy..."
            />
            <label for="tools">Tools (separate by comma)</label>
            <textarea
                name="tools"
                id="tools"
                placeholder="Svelte, Flask, TypeScript, Figma..."
            />
            <label for="team">Co-creators (separated by comma)</label>
            <input
                name="team"
                id="team"
                placeholder="John Doe, Dr. Heinz Doofenshmirtz..."
            />
            <label for="links[]">Project links</label>
            {#each Array(numLinks) as _, i}
                <input
                    name="links[{i}][0]"
                    id={"linkName" + i}
                    placeholder="Choose a link..."
                    list="linkTypes"
                />
                <datalist id="linkTypes">
                    <option>GitHub</option>
                    <option>Website</option>
                    <option>Youtube</option>
                </datalist>
                <input
                    name="links[{i}][1]"
                    id={"linkSrc" + i}
                    placeholder="https://a-website.com..."
                /><br />
            {/each}
            <button type="button" on:click={() => (numLinks += 1)}
                >add a link</button
            >
            <button type="button" on:click={addProject}>finish</button>
        </form>
    {/if}

    {#if projectData}
        <div id="projects">
            {#each projectData as p}
                <div class="project-box">
                    <h2>{p.name}</h2>
                    <p>
                        {p.startYear}
                        {#if isUndefined(p.finishYear)}
                            - present
                        {:else if p.finishYear !== p.startYear}
                            - {p.finishYear}
                        {/if}
                    </p>
                    {#if p.team.length > 0}
                        <h4>Team</h4>
                        <p>
                            {#each p.team as t, i}
                                {t}
                                {#if i !== p.team.length - 1}
                                    ,&nbsp;
                                {/if}
                            {/each}
                        </p>
                    {/if}
                    <h4>Description</h4>
                    <p>{p.description}</p>
                    {#if p.tools.length > 0}
                        <h4>Tools</h4>
                        <div class="tools">
                            {#each p.tools as t}
                                <div class="tool">{t}</div>
                            {/each}
                        </div>
                    {/if}
                    <div class="project-links">
                        {#each p.links as l}
                            <a href={l.src}>
                                <button>
                                    <p>
                                        {#if l.name === "GitHub"}
                                            <i
                                                class="fab fa-github"
                                            />&nbsp;GitHub
                                        {:else if l.name === "Website"}
                                            <i
                                                class="fas fa-desktop"
                                            />&nbsp;Website
                                        {:else if l.name === "Youtube"}
                                            <i
                                                class="fab fa-youtube"
                                            />&nbsp;Youtube
                                        {:else}
                                            <i
                                                class="fas fa-link"
                                            />&nbsp;{l.name}
                                        {/if}
                                    </p>
                                </button>
                            </a>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>No projects listed.</p>
    {/if}
</div>

<style>
    #projects {
        display: flex;
        flex-wrap: wrap;
    }

    .project-box {
        background-color: #525972;
        margin: 0.5rem 1rem 0.5rem 0;
        padding: 2rem;
        border-radius: 1rem;
    }

    .project-links button {
        padding: 0 1rem;
        margin: 0;
    }

    h2,
    h4 {
        margin: 0;
    }

    .tool {
        padding: 0.5rem;
        margin: 0.5rem 0;
        margin-right: 0.5rem;
        background-color: #333643;
        border-radius: 0.5rem;
    }

    .tools {
        display: flex;
        flex-wrap: wrap;
    }
</style>
