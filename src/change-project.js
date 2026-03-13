import { addTitle, clearTodoContainer } from './doms.js';

export default function changeProject(clickedElement) {
    
    const projectTitle = document.querySelector('.project-title');

    const currenttitletext = projectTitle ? projectTitle.textContent : '';

    const clickedText = clickedElement.firstChild.textContent;
    if (currenttitletext === clickedText) {
        return; // No change needed if the same project is clicked
    }
    else {
        clearTodoContainer();
        addTitle(clickedElement);
    }
}