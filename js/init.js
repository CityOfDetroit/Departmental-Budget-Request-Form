// import functions
import { fetchAndProcessExcel } from './utils/data_utils/XLSX_handlers.js';
import { loadPageState } from './utils/data_utils/local_storage_handlers.js'
import { visitPage } from './views/view_logic.js'

// path for my laptop
export let DATA_ROOT = '../../../data/law_dept_sample/'
// github path
// export let DATA_ROOT = '../../budget-request-demo/data/law_dept_sample/'

export let REVENUE = 0;
export let TARGET = 2000000;
export var FISCAL_YEAR = '26';
export var OT_FRINGE = 0.0765;

// variables on the salary 
export var fringe = 0.36
export var cola = 0.02
export var merit = 0.02

// sheets to expect on detail sheet
export const SHEETS = [
    {'personnel' : 'FTE, Salary-Wage, & Benefits'},
    {'overtime': 'Overtime & Other Personnel'},
    {'nonpersonnel' : 'Non-Personnel Operating'},
    {'revenue': 'Revenue'}
]

document.addEventListener('DOMContentLoaded', function () {
    // var page_state = loadPageState();
    // visitPage(page_state);
    fetchAndProcessExcel(DATA_ROOT + 'sample_detail_sheet.xlsx');
});

