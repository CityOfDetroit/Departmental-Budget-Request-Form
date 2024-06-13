import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { showPrompt, updatePrompt, updatePromptButtons } from '../../components/prompt/prompt.js'
import { handleFormSubmissions } from './helpers.js'
import { updatePageState, loadPageState } from '../../utils/storage-handlers.js'
import { initializeWelcomePage } from '../00_welcome/main.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'

// Set up links to different pages
export function loadNewInitiatives() {

    //update page state
    updatePageState('new-inits');

    // load text
    updatePrompt('Do you have any new initiatives for FY26?');
    updatePromptButtons('Yes', 'No');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();

    // initialize form

    // initialize form submission
    document.getElementById('form-modal').addEventListener('submit', function(event) {
        handleFormSubmissions(event);
    });

    // initialize buttons
    document.getElementById('btn-last').addEventListener('click', initializeWelcomePage);
}