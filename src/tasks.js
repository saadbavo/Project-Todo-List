import { addTask, toggleTask, removeTask, getTasksForProject } from './storage.js';

const addTaskContainer = document.querySelector('.add-task-container');
const tasksContainer = document.querySelector('.tasks-container');

function buildAddTaskForm() {
    addTaskContainer.innerHTML = '';

    const form = document.createElement('form');
    form.classList.add('task-form');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Add a task...';
    titleInput.classList.add('task-title-input');
    titleInput.required = true;

    const prioritySelect = document.createElement('select');
    prioritySelect.classList.add('task-priority-select');
    ['low', 'medium', 'high'].forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        prioritySelect.appendChild(option);
    });
    prioritySelect.value = 'medium';

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'datetime-local';
    dueDateInput.classList.add('task-due-input');

    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.classList.add('btn-add-task');
    addBtn.textContent = 'Add Task';

    form.appendChild(titleInput);
    form.appendChild(prioritySelect);
    form.appendChild(dueDateInput);
    form.appendChild(addBtn);
    addTaskContainer.appendChild(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        if (!title) return;
        const activeProjectId = form.dataset.projectId;
        const task = addTask(activeProjectId, {
            title,
            priority: prioritySelect.value,
            dueDate: dueDateInput.value
        });
        if (task) {
            renderTask(task, activeProjectId);
        }
        titleInput.value = '';
        dueDateInput.value = '';
        prioritySelect.value = 'medium';
        titleInput.focus();
    });

    return form;
}

function formatDueDate(dueDate) {
    if (!dueDate) return '';
    const d = new Date(dueDate);
    return d.toLocaleString(undefined, {
        month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function renderTask(task, projectId) {
    const item = document.createElement('div');
    item.classList.add('task-item', `priority-${task.priority}`);
    if (task.completed) item.classList.add('completed');
    item.dataset.taskId = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('change', () => {
        toggleTask(projectId, task.id);
        item.classList.toggle('completed', checkbox.checked);
    });

    const info = document.createElement('div');
    info.classList.add('task-info');

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('task-title');
    titleSpan.textContent = task.title;

    const meta = document.createElement('div');
    meta.classList.add('task-meta');

    const badge = document.createElement('span');
    badge.classList.add('priority-badge', `badge-${task.priority}`);
    badge.textContent = task.priority;

    meta.appendChild(badge);

    if (task.dueDate) {
        const due = document.createElement('span');
        due.classList.add('task-due');
        due.textContent = formatDueDate(task.dueDate);
        meta.appendChild(due);
    }

    info.appendChild(titleSpan);
    info.appendChild(meta);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('task-remove-btn');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
        removeTask(projectId, task.id);
        item.remove();
    });

    item.appendChild(checkbox);
    item.appendChild(info);
    item.appendChild(removeBtn);
    tasksContainer.appendChild(item);
}

export function loadProjectTasks(projectId) {
    tasksContainer.innerHTML = '';
    const form = buildAddTaskForm();
    form.dataset.projectId = projectId;

    const tasks = getTasksForProject(projectId);
    tasks.forEach(task => renderTask(task, projectId));
}
