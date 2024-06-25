
import { loadPageState } from '../../utils/storage-handlers.js'
import { PAGES } from '../../init.js'

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
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);
    
    // Check if there is a next key
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
        // Get the next key
        const nextKey = keys[currentIndex + 1];
        const nextFn = PAGES[nextKey];
        nextFn();
    } 
}

export function lastPage(){

    var page_state = loadPageState();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);
    
    // Check if there is a next key
    if (currentIndex >= 1) {
        // Get the next key
        const lastKey = keys[currentIndex - 1];
        const lastFn = PAGES[lastKey];
        lastFn();
    } 
}