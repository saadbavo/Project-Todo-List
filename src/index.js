import './styles.css';
import addProject, { listNameInput }  from './add-project'; 
import { printProjectName, removeProject } from './doms';
const btnAddList = document.querySelector('.btn-add-list');


// default project
printProjectName('My day');

btnAddList.addEventListener('click', addProject);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const project = e.target.closest(".project-name");
        removeProject(project);
    }
});





