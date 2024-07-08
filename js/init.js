// import functions
import { fetchAndProcessExcel } from './utils/data_utils/XLSX_handlers.js';
import { CurrentPage } from './utils/data_utils/local_storage_handlers.js';

// path for my laptop
// export let DATA_ROOT = '../../../data/law_dept_sample/'
// github path
export let DATA_ROOT = '../../budget-request-demo/data/law_dept_sample/'

export let REVENUE = 0;
export let TARGET = 20000000;
export var FISCAL_YEAR = '26';
export var OT_FRINGE = 0.0765;

// variables on the salary 
export var fringe = 0.36
export var cola = 0.02
export var merit = 0.02

// sheets to expect on detail sheet
export const SHEETS = {
    'FTE, Salary-Wage, & Benefits' : 'personnel' ,
    'Overtime & Other Personnel' : 'overtime',
    'Non-Personnel Operating' : 'nonpersonnel',
    'Revenue' : 'revenue'
}

document.addEventListener('DOMContentLoaded', function () {
    CurrentPage.visit();
});

