import { initializeWelcomePage } from '../pages/00_welcome/main.js';
import { loadNewInitiatives } from '../pages/06_new_initiatives/main.js'
import { loadRevenuePage } from '../pages/03_revenue/main.js'
import { loadPersonnelPage } from '../pages/04_personnel/main.js';
import { loadOTPage } from '../pages/04.5_OT/main.js';
import { loadNonpersonnelPage } from '../pages/05_nonpersonnel/main.js';
import { loadBaselineLandingPage } from '../pages/02_baseline_landing_page/main.js';
import { loadSummaryPage } from '../pages/07_summary/main.js';
import { loadUploadPage } from '../pages/01_upload/main.js';

import { loadPageState } from './storage-handlers.js';

export let PAGES = {
    'welcome' : initializeWelcomePage,
    'upload' : loadUploadPage,
    'baseline-landing' : loadBaselineLandingPage,
    'revenue' : loadRevenuePage,
    'personnel' : loadPersonnelPage,
    'overtime' : loadOTPage,
    'nonpersonnel' : loadNonpersonnelPage,
    'new-inits' : loadNewInitiatives,
    'summary' : loadSummaryPage 
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