import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, updatePromptButtons, addPromptButtonAction, hidePrompt, hidePromptButtons } from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import Table from '../../components/table/table.js'
import Sidebar from '../../components/sidebar/sidebar.js'

import { updatePageState } from "../../utils/storage-handlers.js";

export function loadOTPage(){
    //update page state
    updatePageState('overtime');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    Sidebar.hide();
    Table.hide();
    hidePromptButtons();

    // update page text
    updateSubtitle('Overtime Estimates');
    // TODO: update to make dynamic
    updatePrompt(`This is a placeholder for the OT estimates.`);
}