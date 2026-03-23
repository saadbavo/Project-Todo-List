import { setActiveProjectItem, setTodoTitle } from './doms.js';
import { setActiveProject } from './storage.js';
import { loadProjectTasks } from './tasks.js';

export default function changeProject(projectId, projectName) {
    setActiveProject(projectId);
    setActiveProjectItem(projectId);
    setTodoTitle(projectName);
    loadProjectTasks(projectId);
}