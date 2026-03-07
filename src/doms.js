


export const listContainer = document.querySelector('.list-container');
export const listNameInput = document.querySelector('.list-name');

export function printProjectName(projectName) {
    const projectNameElement = document.createElement('span');
    projectNameElement.classList.add('project-name');
    projectNameElement.textContent = projectName;
    listContainer.appendChild(projectNameElement);
}

export function clearInput() {
    listNameInput.value = '';
}
export function addRemoveBtn(projectNameElement) {
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'x';
    projectNameElement.appendChild(removeBtn);
}

export function removeProject(project) {
    project.remove();
}
