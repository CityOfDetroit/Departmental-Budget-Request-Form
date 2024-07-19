import Prompt from "../../components/prompt/prompt.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";
import { FundLookupTable } from "../../utils/data_utils/budget_data_handlers.js";
import { CurrentFund } from "../../utils/data_utils/local_storage_handlers.js";

const nonPersonnelColumns = [
    { title: 'FY26 Request', className: 'request', isCost: true },
    { title: 'Amount Remaining on Contract', className: 'remaining', isCost: true },
    { title: 'Service', className : 'service' },
    { title: 'Edit', className : 'edit' },
    { title : 'Account String', className : 'account-string'},
    { title : 'CPA #', className : 'cpa'},
    { title : 'Contract End Date', className : 'contract-end'},
    { title: 'Recurring or One-Time', className: 'recurring'},
    { title: 'Object Name', className: 'object'}
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
    NavButtons.Next.enable();
}

export async function initializeNonpersonnelTable(){
    // load table data from storage
    if(await Table.Data.load()) {
        //after table is loaded, fill it
        Table.show();
        Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, "Edit");
        // assign cost classes
        Table.Columns.assignClasses(nonPersonnelColumns);
        // enable editing
        Table.Buttons.Edit.init(nonPersonnelRowOnEdit, Table.save);
    } else {
        Prompt.Text.update('No non-personnel expenditures for this fund.')
    }
}

function nonPersonnelRowOnEdit(){
    // make it editable
    Table.Cell.createTextbox('request', true);
    Table.Cell.createServiceDropdown();
}

