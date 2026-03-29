const STORAGE_KEY = 'todo-app-data';

function getState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return {
            projects: [{ id: 'default', name: 'My day', tasks: [] }],
            activeProjectId: 'default'
        };
    }
    return JSON.parse(raw);
}

function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getProjects() {
    return getState().projects;
}

export function getActiveProjectId() {
    return getState().activeProjectId;
}

export function addProject(name) {
    const state = getState();
    const project = { id: Date.now().toString(), name, tasks: [] };
    state.projects.push(project);
    saveState(state);
    return project;
}

export function removeProject(id) {
    const state = getState();
    state.projects = state.projects.filter(p => p.id !== id);
    if (state.activeProjectId === id) {
        state.activeProjectId = state.projects[0]?.id || null;
    }
    saveState(state);
    return state.activeProjectId;
}

export function setActiveProject(id) {
    const state = getState();
    state.activeProjectId = id;
    saveState(state);
}

export function getTasksForProject(id) {
    const state = getState();
    const project = state.projects.find(p => p.id === id);
    return project ? project.tasks : [];
}

export function addTask(projectId, task) {
    const state = getState();
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return null;
    const newTask = {
        id: Date.now().toString(),
        title: task.title,
        priority: task.priority,
        dueDate: task.dueDate,
        completed: false
    };
    project.tasks.push(newTask);
    saveState(state);
    return newTask;
}

export function toggleTask(projectId, taskId) {
    const state = getState();
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (task) task.completed = !task.completed;
    saveState(state);
}

export function removeTask(projectId, taskId) {
    const state = getState();
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    project.tasks = project.tasks.filter(t => t.id !== taskId);
    saveState(state);
}

