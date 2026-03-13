


export const listContainer = document.querySelector('.list-container');
export const listNameInput = document.querySelector('.list-name');
export const todoContainer = document.getElementById('todo');
export function printProjectName(projectName) {
    const projectNameElement = document.createElement('span');
    projectNameElement.classList.add('project-name');
    projectNameElement.textContent = projectName;
    listContainer.appendChild(projectNameElement);
}

export function clearInput() {
    listNameInput.value = '';
}
export function addRemoveBtn(listcontainer) {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'x';
    listcontainer.appendChild(removeBtn);
}

export function removeProject(project) {
    project.remove();
}


export function addTitle(projectNameElement) {
    const title = document.createElement('h2');
    title.classList.add('project-title');
    title.textContent = projectNameElement.firstChild.textContent;
    todoContainer.appendChild(title);
}
export function clearTodoContainer() {
    todoContainer.innerHTML = '';
}
    