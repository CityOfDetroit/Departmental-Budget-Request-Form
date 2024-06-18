
import { updatePageState } from "../../utils/storage-handlers.js";

//helpers
import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { addCol, addColToEnd, showTable } from "../../components/table/table.js";
import { showSideBar } from "../../components/sidebar/sidebar.js";

export function loadPersonnelPage(){

    //update page state
    updatePageState('personnel');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    showSideBar();
    hidePromptButtons();

    // update page text
    updateSubtitle('Personnel');
    // TODO: update to make dynamic
    updatePrompt('For each job in your department, select the service and request the number of baseline and supplemental FTEs.');
    

    // Initialize table
    loadJSONIntoTable('../../../data/law_dept_sample/personnel_data.json', 'main-table')
        .then(() => {
            showTable('main-table');
            addCol('main-table', 2, '', 'Service');
            addColToEnd('main-table', '$ -', 'Total Cost (Baseline)');
            addColToEnd('main-table', '$ -', 'Total Cost (Supplementary)');
        })
        .catch(error => {
            console.error('An error occurred during table initialization:', error);
        });
    

}