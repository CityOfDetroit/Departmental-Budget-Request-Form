
import { initializeWelcomePage } from '../../pages/00_welcome/main.js';
import { loadNewInitiatives } from '../../pages/02_new_initiatives/main.js'
import { loadRevenuePage } from '../../pages/03_revenue/main.js'
import { loadPersonnelPage } from '../../pages/04_personnel/main.js';
import { loadPageState } from '../../utils/storage-handlers.js'


let pages = {'welcome' : initializeWelcomePage,
            'new-inits' : loadNewInitiatives,
            'revenue' : loadRevenuePage,
            'personnel' : loadPersonnelPage }

export function hideNavButtons() {
    document.getElementById('nav-btns').style.display = 'none';
}

export function showNavButtons() {
    document.getElementById('nav-btns').style.display = 'block';
}

// imputs next and last should be functions to render the appropriate pages
export function initializeNavButtons(){
    // initialize last button
    const last_btn = document.getElementById('btn-last');
    last_btn.addEventListener('click', lastPage); 
    // initialize next button
    const next_btn = document.getElementById('btn-next');
    next_btn.addEventListener('click', nextPage); 
}

export function nextPage(){

    var page_state = loadPageState();
    const keys = Object.keys(pages);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);
    
    // Check if there is a next key
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
        // Get the next key
        const nextKey = keys[currentIndex + 1];
        const nextFn = pages[nextKey];
        nextFn();
    } 
}

export function lastPage(){

    var page_state = loadPageState();
    const keys = Object.keys(pages);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);
    
    // Check if there is a next key
    if (currentIndex >= 1) {
        // Get the next key
        const lastKey = keys[currentIndex - 1];
        const lastFn = pages[lastKey];
        lastFn();
    } 
}