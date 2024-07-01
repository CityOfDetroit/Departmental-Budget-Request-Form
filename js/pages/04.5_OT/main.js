import { updateSubtitle } from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import { updatePageState } from "../../utils/storage-handlers.js";
import Body from '../../components/body/body.js';
import NavButtons from '../../components/nav_buttons/nav_buttons.js';

export function loadOTPage(){
    //update page state
    updatePageState('overtime');

    // prepare page view
    Body.clearAll();
    NavButtons.show();

    // update page text
    updateSubtitle('Overtime Estimates');
    // TODO: update to make dynamic
    Prompt.Text.update(`This is a placeholder for the OT estimates.`);
}