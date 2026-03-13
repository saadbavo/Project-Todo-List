import './styles.css';
import addProject, { listNameInput }  from './add-project'; 
import { addTitle, printProjectName, removeProject, todoContainer, listContainer } from './doms';
const btnAddList = document.querySelector('.btn-add-list');
import changeProject from './change-project';




// default project
printProjectName('My day');
addTitle({ firstChild: { textContent: 'My day' } });

btnAddList.addEventListener('click', addProject);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const project = e.target.closest(".project-name");
        removeProject(project);
    }
});
//change at evry click on project name


listContainer.addEventListener('click', (e) => {
    // Only trigger if they clicked the project name span (and NOT the remove button)
    if (e.target.classList.contains('project-name')) {
        changeProject(e.target); // Pass the specific clicked element
    }
});