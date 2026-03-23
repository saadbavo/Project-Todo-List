import './styles.css';
import { listContainer, listNameInput, renderProjectItem, setActiveProjectItem, setTodoTitle } from './doms.js';
import addProject from './add-project.js';
import changeProject from './change-project.js';
import { getProjects, getActiveProjectId, removeProject } from './storage.js';
import { loadProjectTasks } from './tasks.js';

const btnAddList = document.querySelector('.btn-add-list');

function init() {
    const projects = getProjects();
    let activeId = getActiveProjectId();

    if (!activeId && projects.length > 0) {
        activeId = projects[0].id;
    }

    projects.forEach(project => renderProjectItem(project));

    if (activeId) {
        const active = projects.find(p => p.id === activeId);
        if (active) {
            setActiveProjectItem(activeId);
            setTodoTitle(active.name);
            loadProjectTasks(activeId);
        }
    }
}

btnAddList.addEventListener('click', addProject);

listNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addProject();
});

listContainer.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    const projectItem = e.target.closest('.project-name');

    if (removeBtn && projectItem) {
        const projectId = projectItem.dataset.projectId;
        const newActiveId = removeProject(projectId);
        projectItem.remove();

        if (newActiveId) {
            const remaining = document.querySelector(`[data-project-id="${newActiveId}"]`);
            if (remaining) {
                const name = remaining.querySelector('.project-name-text').textContent;
                changeProject(newActiveId, name);
            }
        } else {
            setTodoTitle('');
            document.querySelector('.add-task-container').innerHTML = '';
            document.querySelector('.tasks-container').innerHTML = '';
            document.getElementById('todo-header').innerHTML = '';
        }
        return;
    }

    if (projectItem) {
        const projectId = projectItem.dataset.projectId;
        const name = projectItem.querySelector('.project-name-text').textContent;
        changeProject(projectId, name);
    }
});

init();