import { initializeWelcomePage } from './00_welcome/main.js';
import { cleanUpInitiativesPage, loadNewInitiatives } from './06_new_initiatives/main.js'
import { loadRevenuePage, cleanupRevenuePage } from './03_revenue/main.js'
import { loadPersonnelPage } from './04_personnel/main.js';
import { loadOTPage } from './04.5_OT/main.js';
import { loadNonpersonnelPage } from './05_nonpersonnel/main.js';
import { loadBaselineLandingPage } from './02_baseline_landing_page/main.js';
import { loadSummaryPage } from './07_summary/main.js';
import { loadUploadPage } from './01_upload/main.js';

import { loadPageState } from '../utils/data_utils/local_storage_handlers.js';

export let PAGES = {
    'welcome' : initializeWelcomePage,
    'upload' : loadUploadPage,
    'revenue' : loadRevenuePage,
    'baseline-landing' : loadBaselineLandingPage,
    'personnel' : loadPersonnelPage,
    'overtime' : loadOTPage,
    'nonpersonnel' : loadNonpersonnelPage,
    'new-inits' : loadNewInitiatives,
    'summary' : loadSummaryPage 
}

export let CLEANUP = {
    'new-inits' : cleanUpInitiativesPage,
    'revenue' : cleanupRevenuePage
}

export function nextPage(){

    var page_state = loadPageState();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);

    // clean up current page
    if (CLEANUP[page_state]) { CLEANUP[page_state]() };
    
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

    // clean up current page
    if (CLEANUP[page_state]) { CLEANUP[page_state]() };
    
    // Check if there is a next key
    if (currentIndex >= 1) {
        // Get the next key
        const lastKey = keys[currentIndex - 1];
        const lastFn = PAGES[lastKey];
        lastFn();
    } 
}