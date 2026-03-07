import { listContainer, printProjectName, clearInput, listNameInput, addRemoveBtn   }   from "./doms";

export default function addProject() {
    const projectNAme = listNameInput.value;
    if (projectNAme.trim() === '') {
        alert('Please enter a project name');
        return;
    }
    printProjectName(projectNAme);
    clearInput();
    const projectNameElement = listContainer.lastChild;
    addRemoveBtn(projectNameElement);
    
}

