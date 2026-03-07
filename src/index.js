import './styles.css';
import addProject, { listNameInput }  from './add-project'; 
const btnAddList = document.querySelector('.btn-add-list');

btnAddList.addEventListener('click', addProject);

