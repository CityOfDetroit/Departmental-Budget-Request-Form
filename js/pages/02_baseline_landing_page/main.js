import { updatePageState } from "../../utils/storage-handlers.js";
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, hidePromptButtons } from '../../components/prompt/prompt.js'
import { showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import { hideTable, showTable } from '../../components/table/table.js'
import { hideSideBar } from '../../components/sidebar/sidebar.js'
import { removeModalLink } from '../../components/modal/modal.js'
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { DATA_ROOT } from "../../init.js";

export function loadBaselineLandingPage(){
    //update page state
    updatePageState('baseline-landing');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    hideTable('main-table');
    hideSideBar();
    removeModalLink('option1', 'main-modal');
    hidePromptButtons();

    // update page text
    updateSubtitle('Baseline Budget Request');
    // TODO: update to make dynamic
    updatePrompt(`We will now ask you a series of questions about your BASELINE budget request.
        At the end, we will ask you about any new initiatives (ie. supplemental requests).
        Select one of your funds to begin.`);

    loadJSONIntoTable(DATA_ROOT + 'funds.json', 'main-table')
    showTable('main-table');
}