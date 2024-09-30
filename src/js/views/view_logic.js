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
import { FISCAL_YEAR, PAGE_LABELS } from '../constants/';

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

function nextPageValue() {
    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
    const currentIndex = keys.indexOf(page_state);

    if (CurrentPage.load() == 'nonpersonnel') {
        FundLookupTable.editFund(CurrentFund.number());
        if (FundLookupTable.fundsLeft()) {
            return 'baseline-landing';
        }
    }

    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
        const nextKey = keys[currentIndex + 1];
        return nextKey;
    }
}

export function nextPage() {
    visitPage(nextPageValue());
}

export function nextPageLabel() {
    return PAGE_LABELS[nextPageValue()];
}

function lastPageValue() {
    var page_state = CurrentPage.load();
    const keys = Object.keys(PAGES);
    const currentIndex = keys.indexOf(page_state);
    
    if (currentIndex >= 1) {
        return keys[currentIndex - 1];
    }
}

export function lastPage() {
    visitPage(lastPageValue());
}

export function lastPageLabel() {
    return PAGE_LABELS[lastPageValue()];
}