import { updatePageState } from "../../utils/storage-handlers.js";
import { updateSubtitle } from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import Table from "../../components/table/table.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";

export function loadBaselineLandingPage(){
    //update page state
    updatePageState('baseline-landing');

    // prepare page view
    Body.clearAll();
    showNavButtons();

    // update page text
    updateSubtitle('Baseline Budget Request');
    // TODO: update to make dynamic
    Prompt.Text.update(`We will now ask you a series of questions about your BASELINE budget request.
        At the end, we will ask you about any new initiatives (ie. supplemental requests).
        Select one of your funds to begin.`);

    loadJSONIntoTable(DATA_ROOT + 'funds.json', 'main-table')
    Table.adjustWidth('100%');
    Table.show();
}