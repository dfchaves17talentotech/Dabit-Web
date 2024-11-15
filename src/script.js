import {fetchContinentData, getDataContinents} from "./components/continents.js"
import {fetchProjectsData, getDataProjects} from "./components/projects.js";
import { formSubmit } from "./components/contact.js";

window.addEventListener('load', async () => {
    const continentData = await getDataContinents();
    const projectsData = await getDataProjects();
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', formSubmit);
    fetchProjectsData(projectsData);
    await fetchContinentData(continentData);
});
