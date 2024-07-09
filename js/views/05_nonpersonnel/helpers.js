import Prompt from "../../components/prompt/prompt.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";

const nonPersonnelColumns = [
    { title: 'FY26 Request', className: 'request', isCost: true },
    { title: 'Amount Remaining', className: 'remaining', isCost: true },
];

export function preparePageView(){
    // prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();
    Table.adjustWidth('100%');
    // update page text
    Subtitle.update('Non-Personnel');
    Prompt.Text.update('Select an action item for each non-personnel line item from last year.');

    // just enable next for now
    // TODO: only enable when all info is entered
    NavButtons.Next.enable();
}

export async function initializeNonpersonnelTable(){
    // load table data from json
    await Table.Data.loadFromJSON(DATA_ROOT + 'nonpersonnel_data.json', 'main-table');
    //after table is loaded, fill it
    Table.show();
    Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, " ");
    // assign cost classes
    Table.Columns.assignClasses(nonPersonnelColumns);
    // update sidebar
    updateDisplayandTotals();
    // enable editing
    Table.Buttons.Edit.init(nonPersonnelRowOnEdit, updateDisplayandTotals);
}

function nonPersonnelRowOnEdit(){
    // make it editable
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

