import './nav_buttons.css';

import { nextPage, lastPage } from '../../views/view_logic.js'

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

function disable(button_id) {
    document.getElementById(button_id).classList.add('disabled');
}

function enable(button_id) {
    document.getElementById(button_id).classList.remove('disabled');
}

const Next = {
    disable : function() { disable('btn-next') },
    enable : function() { enable('btn-next') },
    addAction : function(fn) {
        document.querySelector(`#btn-next`).addEventListener('click', fn);
    },
    removeAction : function(fn) {
        document.querySelector(`#btn-next`).removeEventListener('click', fn);
    },
}

const Last = {
    disable : function() { disable('btn-last') },
    enable : function() { enable('btn-last') }
}

export const NavButtons = {
    hide : hideNavButtons,
    show : showNavButtons,
    Next : Next,
    Last : Last
}

export default NavButtons;