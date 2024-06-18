
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { hidePrompt, showPrompt, updatePrompt, updatePromptButtons, addPromptButtonAction } from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import { loadRevenuePage } from '../03_revenue/main.js'
import { addModalLink, updateModalTitle, clearModal, hideModal } from '../../components/modal/modal.js'
import { fetchAllResponses, addTextarea, addTextInput, addNumericInput, addSubmitButtonToForm, addForm } from '../../components/form/form.js'
import { adjustTableWidth, hideTable, clearTable, updateAddButtonText, addNewRow, showTable, showAddButton } from '../../components/table/table.js'
import { hideSideBar } from '../../components/sidebar/sidebar.js'

export function initializePageView() {
    // Load text
    updateSubtitle('New Initiatives');
    updatePrompt('Do you have any new initiatives for FY26?');
    updatePromptButtons('Yes', 'No');

    // Prepare page view
    hideWelcomeButtons();
    showNavButtons();
    hideSideBar();
    showPrompt();
    hideTable('main-table');
}

export function setUpModal() {
    // Initialize modal
    clearModal();
    addModalLink('option1', 'main-modal');
    updateModalTitle('New initiative');
    addModalLink('add-btn', 'main-modal');
}

export function setUpForm() {
    // Set up form
    addForm();
    addTextInput('Initiative Name:', 'Initiative Name', true); // Add required field
    addTextarea('Explain why this initiative is necessary and describe its potential impact.', 'Explanation', true);
    addNumericInput('Roughly how additional money would this initiative require?', 'Cost', true);
    addSubmitButtonToForm();
    // Initialize form submission to table data
    handleFormSubmissions();
}

export function setUpTable() {
    // Set up table
    clearTable('main-table');
    adjustTableWidth('main-table', '70%');
    updateAddButtonText('Add another new initiative');
}

export function handleNavigation() {
    // clicking 'No' (no new initiatives) will also take us to the next page
    addPromptButtonAction('option2', loadRevenuePage);
}

export function handleFormSubmissions(event){
        // initialize form submission
        const modal = document.getElementById('main-modal');
        modal.addEventListener('submit', function(event) {
            // get answers from form, hide form, show answers in table
            const responses = fetchAllResponses(event);
    
            // change page view
            hideModal('main-modal');
            hidePrompt();
    
            // add data to table
            addNewRow('main-table', responses);
            showTable('main-table');
            showAddButton();
            // TODO: save table data
            // TODO: edit cost to show currency correctly
        });
}
