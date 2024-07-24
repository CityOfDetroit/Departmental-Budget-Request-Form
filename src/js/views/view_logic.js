import { initializeWelcomePage } from './00_welcome/main.js';
import { cleanUpInitiativesPage, loadNewInitiatives } from './07_new_initiatives/main.js'
import { loadRevenuePage, cleanupRevenuePage } from './03_revenue/main.js'
import { loadPersonnelPage } from './04_personnel/main.js';
import { loadOTPage } from './05_overtime/main.js';
import { loadNonpersonnelPage } from './06_nonpersonnel/main.js';
import { loadBaselineLandingPage } from './02_baseline_landing_page/main.js';
import { cleanUpSummaryPage, loadSummaryPage } from './08_summary/main.js';
import { loadUploadPage } from './01_upload/main.js';
import { CurrentPage, CurrentFund } from '../utils/data_utils/local_storage_handlers.js';
import { FundLookupTable } from '../utils/data_utils/budget_data_handlers.js';

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

export let CLEANUP = {
    'new-inits' : cleanUpInitiativesPage,
    'summary' : cleanUpSummaryPage
}

export function visitPage(new_page_key){
    // clean up from current page
    var page_state = CurrentPage.load();
    if (CLEANUP[page_state]) { CLEANUP[page_state]() };
    // Use the page_state to access and call the corresponding function from PAGES
    if (PAGES[new_page_key]) {
        PAGES[new_page_key](); // Invokes the function if it exists in the PAGES map
    } else {
        console.error(`No page initializer found for state: ${new_page_key}`);
    }}

export function nextPage(){

    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);

    // clean up current page
    if (CLEANUP[page_state]) { CLEANUP[page_state]() };

    // unless on personnel (which will go to overtime), return to summary if all funds are viewed
    const returnPages = ['revenue', 'nonpersonnel', 'new-inits', 'overtime'];
    if (!FundLookupTable.fundsLeft() && returnPages.includes(CurrentPage.load())) {
        visitPage('summary');
        return;
    }

    // if on non-personnel, circle back to fund selection unless all funds are edited
    if (CurrentPage.load() == 'nonpersonnel'){
        // mark fund as viewed/edited
        FundLookupTable.editFund(CurrentFund.number());
        // if any funds left to edit, go back to that page
        if ( FundLookupTable.fundsLeft() ){
            visitPage('baseline-landing');
            return;
        }
    }

    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
        // Check if there is a next key, and get it
        const nextKey = keys[currentIndex + 1];
        // go to that page
        visitPage(nextKey);
    } 
}

export function lastPage(){

    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);

    // clean up current page
    if (CLEANUP[page_state]) { CLEANUP[page_state]() };
    
    // Check if there is a next key
    if (currentIndex >= 1) {
        // Get the next key
        const lastKey = keys[currentIndex - 1];
        // go to that page
        visitPage(lastKey);
    } 
}