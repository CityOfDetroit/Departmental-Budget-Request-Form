import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import { summaryView, disablePromptButtons } from "./helpers.js";

export function loadSummaryPage(){
    //update page state
    CurrentPage.update('summary');
    summaryView();
}

export function cleanUpSummaryPage(){
    disablePromptButtons();
}

