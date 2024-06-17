import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, updatePromptButtons, addPromptButtonAction } from '../../components/prompt/prompt.js'
import { handleFormSubmissions } from './helpers.js'
import { updatePageState } from '../../utils/storage-handlers.js'
import { initializeWelcomePage } from '../00_welcome/main.js'
import { showNavButtons, updateNavButtonLinks } from '../../components/nav_buttons/nav_buttons.js'
import { loadRevenuePage } from '../03_revenue/main.js'
import { addModalLink, updateModalTitle, clearModal } from '../../components/modal/modal.js'
import { addTextarea, addTextInput, addNumericInput, addSubmitButtonToForm, addForm } from '../../components/form/form.js'

// set up page and initialize all buttons
export function loadNewInitiatives() {

    //update page state
    updatePageState('new-inits');

    // load text
    updateSubtitle('New Initiatives');
    updatePrompt('Do you have any new initiatives for FY26?');
    updatePromptButtons('Yes', 'No');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();

    // initialize modal
    addModalLink('option1', 'main-modal');
    clearModal();
    updateModalTitle('New initiative');

    // set up form
    addForm();
    addTextInput('Initiative Name:', 'Initiative Name', true); //add required field
    addTextarea('Explain why this initiative is neccessary and describe its potential impact.', 'Explanation', true);
    addNumericInput('Roughly how additional money would this initiative require?', 'Cost', true);
    addSubmitButtonToForm();

    // initialize form submission
    // document.getElementById('main-modal').addEventListener('submit', function(event) {
    //     handleFormSubmissions(event);
    // });
    
    // initialize nav buttons fn(last, next)
    updateNavButtonLinks(initializeWelcomePage, loadRevenuePage);

    // clicking 'No' (no new initiatives) will also take us to the next page
    addPromptButtonAction('option2', loadRevenuePage);
}