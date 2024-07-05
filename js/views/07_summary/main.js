import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import Prompt from '../../components/prompt/prompt.js'
import { initializeWelcomePage } from "../00_welcome/main.js";
import Body from "../../components/body/body.js";
import Subtitle from "../../components/header/header.js";
import { visitPage } from "../view_logic.js";

export function loadSummaryPage(){
    //update page state
    updatePageState('summary');

    // prepare page view
    Body.reset();
    Prompt.Buttons.Left.updateText('Download Excel');
    Prompt.Buttons.Right.updateText('Go back and edit');

    // update page text
    Subtitle.update('Summary');
    // TODO: update to make dynamic
    Prompt.Text.update(`Placeholder for summary and any issues.`);
    Prompt.Buttons.Right.addAction(returnToWelcome);
}

export function cleanUpSummaryPage(){
    Prompt.Buttons.Right.removeAction(returnToWelcome);
}

const returnToWelcome = () => {visitPage('welcome')}