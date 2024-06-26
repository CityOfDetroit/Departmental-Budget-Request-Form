import { updatePageState } from "../../utils/storage-handlers.js";
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, addPromptButtonAction, updatePromptButtons } from '../../components/prompt/prompt.js'
import { hideNavButtons, lastPage, showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import { hideTable } from '../../components/table/table.js'
import { hideSidebar } from '../../components/sidebar/sidebar.js'
import { removeModalLink } from '../../components/modal/modal.js'
import { initializeWelcomePage } from "../00_welcome/main.js";

export function loadSummaryPage(){
    //update page state
    updatePageState('summary');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    hideTable('main-table');
    hideSidebar();
    removeModalLink('option1', 'main-modal');
    updatePromptButtons('Submit', 'Go back and edit');
    hideNavButtons();

    // update page text
    updateSubtitle('Summary');
    // TODO: update to make dynamic
    updatePrompt(`Placeholder for summary and any issues.`);
    addPromptButtonAction('option2', initializeWelcomePage);
}