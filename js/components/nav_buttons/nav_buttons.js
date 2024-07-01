import { nextPage, lastPage } from '../../utils/navigation-logic.js'

function initializeNavButtons(){
    // initialize last button
    const last_btn = document.getElementById('btn-last');
    last_btn.addEventListener('click', lastPage); 
    // initialize next button
    const next_btn = document.getElementById('btn-next');
    next_btn.addEventListener('click', nextPage); 
}

function hideNavButtons() {
    document.getElementById('nav-btns').style.display = 'none';
}

function showNavButtons() {
    document.getElementById('nav-btns').style.display = 'block';
    initializeNavButtons();
}

export const NavButtons = {
    hide : hideNavButtons,
    show : showNavButtons,
}

export default NavButtons;