// import styles
import '../css/common.css';

// import functions
import { CurrentPage } from './utils/data_utils/local_storage_handlers.js';

// temporary hard-coding
export let REVENUE = 0;
export let TARGET = 10000000;
// Set to equal current fiscal year
export var FISCAL_YEAR = '26';

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

