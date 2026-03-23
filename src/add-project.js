import { listNameInput, clearInput, renderProjectItem, setActiveProjectItem, setTodoTitle } from './doms.js';
import { addProject as saveProject, setActiveProject } from './storage.js';
import { loadProjectTasks } from './tasks.js';

export default function addProject() {
    const name = listNameInput.value.trim();
    if (!name) {
        alert('Please enter a list name');
        return;
    }
    const project = saveProject(name);
    renderProjectItem(project);
    setActiveProject(project.id);
    setActiveProjectItem(project.id);
    setTodoTitle(project.name);
    loadProjectTasks(project.id);
    clearInput();
}

