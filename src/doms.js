export const listContainer = document.querySelector('.list-container');
export const listNameInput = document.querySelector('.list-name');
export const todoHeader = document.getElementById('todo-header');

export function renderProjectItem(project) {
    const span = document.createElement('span');
    span.classList.add('project-name');
    span.dataset.projectId = project.id;

    const nameText = document.createElement('span');
    nameText.classList.add('project-name-text');
    nameText.textContent = project.name;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = '×';

    span.appendChild(nameText);
    span.appendChild(removeBtn);
    listContainer.appendChild(span);
    return span;
}

export function setActiveProjectItem(id) {
    document.querySelectorAll('.project-name').forEach(el => {
        el.classList.toggle('active', el.dataset.projectId === id);
    });
}

export function clearInput() {
    listNameInput.value = '';
}

export function setTodoTitle(name) {
    todoHeader.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.classList.add('project-title');
    h2.textContent = name;
    todoHeader.appendChild(h2);
}



