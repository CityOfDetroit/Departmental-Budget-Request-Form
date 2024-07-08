// import functions
import { loadPageState } from './utils/data_utils/local_storage_handlers.js'
import { visitPage } from './views/view_logic.js'

// path for my laptop
// export let DATA_ROOT = '../../../data/law_dept_sample/'
// github path
export let DATA_ROOT = '../../budget-request-demo/data/law_dept_sample/'

export let REVENUE = 0;
export let TARGET = 2000000;
export var FISCAL_YEAR = '26';

// variables on the salary 
export var fringe = 0.36
export var cola = 0.02
export var merit = 0.02


document.addEventListener('DOMContentLoaded', function () {
    var page_state = loadPageState();
    visitPage(page_state);
});

