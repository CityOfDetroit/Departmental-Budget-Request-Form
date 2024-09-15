import WelcomeView from './00_welcome.js';
import UploadView from './01_upload.js';
import FundView from './02_baseline_landing.js';
import RevenueView from './03_revenue.js';
import PersonnelView from './04_personnel.js';
import OvertimeView from './05_overtime.js';
import NonPersonnelView from './06_nonpersonnel.js';
import InitiativesView from './07_new_initiatives.js';
import SummaryView from './08_summary.js';

import { FundLookupTable, CurrentFund, CurrentPage } from '../models/';
import { FISCAL_YEAR } from '../constants/';

// Initialize pages globally once
const PAGES = {
    'welcome': new WelcomeView(),
    'upload': new UploadView(),
    'baseline-landing': new FundView(),
    'revenue': new RevenueView(FISCAL_YEAR),
    'personnel': new PersonnelView(FISCAL_YEAR),
    'overtime': new OvertimeView(FISCAL_YEAR),
    'nonpersonnel': new NonPersonnelView(FISCAL_YEAR),
    'new-inits': new InitiativesView(),
    'summary': new SummaryView()
};

export function visitPage(new_page_key) {
    var page_state = CurrentPage.load();

    // Perform cleanup from the current page
    if (PAGES[page_state]) {
        PAGES[page_state].cleanup();
    }

    if (PAGES[new_page_key]) {
        PAGES[new_page_key].visit();
    } else {
        console.error(`No page initializer found for state: ${new_page_key}`);
    }
}

export function nextPage() {
    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
    const currentIndex = keys.indexOf(page_state);

    const returnPages = ['revenue', 'nonpersonnel', 'new-inits', 'overtime', 'personnel'];
    if (!FundLookupTable.fundsLeft() && returnPages.includes(CurrentPage.load())) {
        visitPage('summary');
        return;
    }

    if (CurrentPage.load() == 'nonpersonnel') {
        FundLookupTable.editFund(CurrentFund.number());
        if (FundLookupTable.fundsLeft()) {
            visitPage('baseline-landing');
            return;
        }
    }

    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
        const nextKey = keys[currentIndex + 1];
        visitPage(nextKey);
    }
}

export function lastPage() {
    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
    const currentIndex = keys.indexOf(page_state);

    if (CurrentPage.load() == 'new-inits') {
        visitPage('baseline-landing');
        return;
    }
    
    if (currentIndex >= 1) {
        const lastKey = keys[currentIndex - 1];
        visitPage(lastKey);
    }
}