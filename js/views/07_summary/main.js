import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import Prompt from '../../components/prompt/prompt.js'
import Body from "../../components/body/body.js";
import Subtitle from "../../components/header/header.js";
import { visitPage } from "../view_logic.js";
import { Accordion } from "../../components/accordion/accordion.js";

export function loadSummaryPage(){
    //update page state
    updatePageState('summary');
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
    
}



const returnToWelcome = () => {visitPage('welcome')}

export function basicView(){
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