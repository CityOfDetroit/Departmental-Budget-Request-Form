// import functions
import { initializeWelcomePage } from './pages/00_welcome/main.js';
import { loadNewInitiatives } from './pages/06_new_initiatives/main.js'
import { loadRevenuePage } from './pages/03_revenue/main.js'
import { loadPageState } from './utils/storage-handlers.js'
import { initializeNavButtons } from './components/nav_buttons/nav_buttons.js';
import { loadPersonnelPage } from './pages/04_personnel/main.js';
import { loadOTPage } from './pages/04.5_OT/main.js';
import { loadNonpersonnelPage } from './pages/05_nonpersonnel/main.js';
import { loadBaselineLandingPage } from './pages/02_baseline_landing_page/main.js';
import { loadSummaryPage } from './pages/07_summary/main.js';
import { loadUploadPage } from './pages/01_upload/main.js';

// path for my laptop
export let DATA_ROOT = '../../../data/law_dept_sample/'
// github path
// export let DATA_ROOT = '../../budget-request-demo/data/law_dept_sample/'

export let REVENUE = 0;
export let TARGET = 2000000;

// variables on the salary 
export var fringe = 0.36
export var cola = 0.02
export var merit = 0.02

export let PAGES = {
    'welcome' : initializeWelcomePage,
    'upload' : loadUploadPage,
    // 'baseline-landing' : loadBaselineLandingPage,
    'revenue' : loadRevenuePage,
    'personnel' : loadPersonnelPage,
    // 'overtime' : loadOTPage,
    // 'nonpersonnel' : loadNonpersonnelPage,
    // 'new-inits' : loadNewInitiatives,
    // 'summary' : loadSummaryPage 
}

document.addEventListener('DOMContentLoaded', function () {
    var page_state = loadPageState();
    initializeNavButtons();

    // Use the page_state to access and call the corresponding function from PAGES
    if (PAGES[page_state]) {
        PAGES[page_state](); // Invokes the function if it exists in the PAGES map
    } else {
        console.error(`No page initializer found for state: ${page_state}`);
        // Optionally, you can call a default function if page_state does not match
        // initializeDefaultPage(); // Assume you have a default page initializer
    }
});