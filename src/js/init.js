// import styles
import '../css/common.css';

// temporary hard-coding
export let TARGET = 10000000;
// Set to equal current fiscal year
export var FISCAL_YEAR = '26';

// import functions
import CurrentPage from './models/current_page.js';

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

