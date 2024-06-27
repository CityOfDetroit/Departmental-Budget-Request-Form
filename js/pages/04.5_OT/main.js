import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt } from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import { updatePageState } from "../../utils/storage-handlers.js";
import Body from '../../components/body/body.js';

export function loadOTPage(){
    //update page state
    updatePageState('overtime');

    // prepare page view
    Body.clearAll();
    showPrompt();
    showNavButtons();

    // update page text
    updateSubtitle('Overtime Estimates');
    // TODO: update to make dynamic
    updatePrompt(`This is a placeholder for the OT estimates.`);
}