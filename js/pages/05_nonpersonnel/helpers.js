import Prompt from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";

const nonPersonnelColumns = [
    { title: 'Request Total', className: 'request', isCost: true },
];

export function preparePageView(){
    // prepare page view
    Body.clearAll();
    showNavButtons();
    Sidebar.show();
    Table.adjustWidth('100%');
    // update page text
    updateSubtitle('Non-Personnel');
    Prompt.Text.update('Select an action item for each non-personnel line item from last year.');
    updateDisplayandTotals();
}

export async function initializeNonpersonnelTable(){
    // load table data from json
    await loadJSONIntoTable(DATA_ROOT + 'nonpersonnel_data.json', 'main-table');
    //after table is loaded, fill it
    Table.show();
    Table.Columns.addAtEnd(Table.Buttons.all_btns, "Select Action");
    // assign cost classes
    Table.Columns.assignClasses(nonPersonnelColumns);
    Table.Buttons.Edit.init(nonPersonnelRowOnEdit, updateDisplayandTotals);
}

function nonPersonnelRowOnEdit(){
    Table.Cell.createTextbox('request');
}

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // initialize
    Sidebar.updateStat('baseline-nonpersonnel', 0);
    // calculate for each row
    let rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++){
        // fetch values for calculations
        let request =  Table.Cell.getValue(rows[i], 'request');
        
        // update counters
        Sidebar.incrementStat('baseline-nonpersonnel', request);
    }
}
