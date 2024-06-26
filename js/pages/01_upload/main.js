import { updatePageState } from "../../utils/storage-handlers.js";
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, addPromptButtonAction, updatePromptButtons, hidePromptButtons } from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import Table from '../../components/table/table.js'
import Sidebar from '../../components/sidebar/sidebar.js'
import { initializeWelcomePage } from "../00_welcome/main.js";

export function loadUploadPage(){
    //update page state
    updatePageState('upload');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    hidePromptButtons();
    showNavButtons();
    Table.hide();
    Sidebar.hide();

    // update page text
    updateSubtitle('Excel Upload');
    // TODO: update to make dynamic
    updatePrompt(`Placeholder for Excel Upload`);
    addPromptButtonAction('option2', initializeWelcomePage);
}