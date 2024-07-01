import { updatePageState } from "../../utils/storage-handlers.js";
import { updateSubtitle } from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Body from "../../components/body/body.js";

export function loadUploadPage(){
    //update page state
    updatePageState('upload');

    // prepare page view
    Body.clearAll();
    NavButtons.show();

    // update page text
    updateSubtitle('Excel Upload');

    // TODO: update to make dynamic
    Prompt.Text.update(`Placeholder for Excel Upload`);
    ///Prompt.Buttons.Right.addAction(initializeWelcomePage)
    
}