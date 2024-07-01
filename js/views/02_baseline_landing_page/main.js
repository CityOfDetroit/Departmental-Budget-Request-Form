import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import Subtitle from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Table from "../../components/table/table.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";

export function loadBaselineLandingPage(){
    //update page state
    updatePageState('baseline-landing');

    // prepare page view
    Body.clearAll();
    NavButtons.show();

    // update page text
    Subtitle.update('Baseline Budget Request');
    // TODO: update to make dynamic
    Prompt.Text.update(`We will now ask you a series of questions about your BASELINE budget request.
        At the end, we will ask you about any new initiatives (ie. supplemental requests).
        Select one of your funds to begin.`);

    Table.Data.loadFromJSON(DATA_ROOT + 'funds.json')
    Table.adjustWidth('100%');
    Table.show();
}