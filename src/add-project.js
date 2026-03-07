import { listContainer, printProjectName, clearInput, listNameInput   }   from "./doms";

export default function addProject() {
    const projectNAme = listNameInput.value;
    if (projectNAme.trim() === '') {
        alert('Please enter a project name');
        return;
    }
    printProjectName(projectNAme);
    clearInput();
    
}

