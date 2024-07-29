import WelcomeView from './00_welcome.js';
import UploadView from './01_upload.js';
import FundView from './02_baseline_landing.js';
import RevenueView from './03_revenue.js';
import PersonnelView from './04_personnel.js';
import OvertimeView from './05_overtime.js';
import NonPersonnelView from './06_nonpersonnel.js';
import InitiativesView from './07_new_initiatives.js';
import SummaryView from './08_summary.js';

import FundLookupTable from '../models/fund_lookup_table.js';
import CurrentFund from '../models/current_fund.js';
import CurrentPage from '../models/current_page.js';
import { FISCAL_YEAR } from '../init.js';

export function initializePages() {
    const PAGES = {
        'welcome': new WelcomeView(),
        'upload': new UploadView(),
        'baseline-landing': new FundView(),
        'revenue': new RevenueView(),
        'personnel': new PersonnelView(FISCAL_YEAR),
        'overtime': new OvertimeView(),
        'nonpersonnel': new NonPersonnelView(FISCAL_YEAR),
        'new-inits': new InitiativesView(),
        'summary': new SummaryView(),
    };
    return PAGES;
}

export function visitPage(new_page_key){

    const PAGES = initializePages();

    // clean up from current page
    var page_state = CurrentPage.load();
    PAGES[page_state].cleanup();
    
    // Use the page_state to access and call the corresponding function from PAGES
    if (PAGES[new_page_key]) {
        // Invokes the function if it exists in the PAGES map
        PAGES[new_page_key].visit(); 
    } else {
        console.error(`No page initializer found for state: ${new_page_key}`);
    }}

export function nextPage(){

    const PAGES = initializePages();

    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);

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

    const PAGES = initializePages();

    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
  
    // Find the index of the current key
    const currentIndex = keys.indexOf(page_state);

    // if on new-inits, circle back to fund selection
    if (CurrentPage.load() == 'new-inits'){
        visitPage('baseline-landing');
        return;
    }
    
    // Check if there is a next key
    if (currentIndex >= 1) {
        // Get the next key
        const lastKey = keys[currentIndex - 1];
        // go to that page
        visitPage(lastKey);
    } 
}