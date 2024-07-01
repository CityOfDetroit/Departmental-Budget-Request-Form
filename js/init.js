// import functions
import { loadPageState } from './utils/data_utils/local_storage_handlers.js'
import { PAGES } from './views/view_logic.js'

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

document.addEventListener('DOMContentLoaded', function () {
    var page_state = loadPageState();

    // Use the page_state to access and call the corresponding function from PAGES
    if (PAGES[page_state]) {
        PAGES[page_state](); // Invokes the function if it exists in the PAGES map
    } else {
        console.error(`No page initializer found for state: ${page_state}`);
    }
});