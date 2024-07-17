
import { initializePageView, setUpModal, setUpForm, removeModalLinks, removePromptButtonListeners, initializeInitTable } from './helpers.js'
import { CurrentPage } from '../../utils/data_utils/local_storage_handlers.js'


// set up page and initialize all buttons
export function loadNewInitiatives() {
    CurrentPage.update('new-inits');
    initializePageView();
    setUpModal();
    setUpForm();
    initializeInitTable();
}

export function cleanUpInitiativesPage() {
    removeModalLinks();
    // remove event listeners on prompt buttons
    removePromptButtonListeners();
}