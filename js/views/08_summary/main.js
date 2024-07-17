import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import Prompt from '../../components/prompt/prompt.js'
import { summaryView } from "./helpers.js";

export function loadSummaryPage(){
    //update page state
    CurrentPage.update('summary');
    summaryView();
}

export function cleanUpSummaryPage(){
    Prompt.Buttons.Right.removeAction(returnToWelcome);
    Prompt.Buttons.Left.removeAction(downloadXLSX);
}

