
import { initializePageView, setUpModal, setUpForm, setUpTable, handleNavigation } from './helpers.js'
import { updatePageState } from '../../utils/storage-handlers.js'


// set up page and initialize all buttons
export function loadNewInitiatives() {
    updatePageState('new-inits');
    initializePageView();
    setUpModal();
    setUpForm();
    setUpTable();
    handleNavigation();
}
