
import { updatePageState } from "../../utils/storage-handlers.js";

//helpers
import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { showTable } from "../../components/table/table.js";
import { showSideBar } from "../../components/sidebar/sidebar.js";

export function loadPersonnelPage(){

    //update page state
    updatePageState('personnel');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();

    // update page text
    updateSubtitle('Personnel');
    // TODO: update to make dynamic
    updatePrompt('For each job in your department, select the service and request the number of baseline and supplemental FTEs.');
    hidePromptButtons();

    // initialize table
    loadJSONIntoTable('../../../data/law_dept_sample/personnel_data.json', 'main-table');
    showTable('main-table');
    showSideBar();

}