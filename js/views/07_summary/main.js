import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import Prompt from '../../components/prompt/prompt.js'
import Body from "../../components/body/body.js";
import Subtitle from "../../components/header/header.js";
import { visitPage } from "../view_logic.js";
import { Accordion } from "../../components/accordion/accordion.js";

export function loadSummaryPage(){
    //update page state
    CurrentPage.update('summary');
    summaryView();
    // basicView();
}

export function cleanUpSummaryPage(){
    Prompt.Buttons.Right.removeAction(returnToWelcome);
}

export function summaryView(){
    Body.reset();
    Accordion.createFromFunds();
    Accordion.show();

    // prompt buttons
    Prompt.Text.update('');
    Prompt.show();
    Prompt.Buttons.Left.updateText('Download Excel');
    Prompt.Buttons.Right.updateText('Go back to home');

    // update page text
    Subtitle.update('Summary');
    // TODO: update to make dynamic
    Prompt.Buttons.Right.addAction(returnToWelcome);
    
}

const returnToWelcome = () => {visitPage('welcome')}

