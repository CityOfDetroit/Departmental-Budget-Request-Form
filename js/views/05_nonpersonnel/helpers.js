import Prompt from "../../components/prompt/prompt.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";

// "Vendor": "Law Firm LLC",
//         "CPA #" : "765421",
//         "Account String": "1000-29320-320010",
//         "Object Name": "Consulting",
//         "End of Contract": "12/31/2024",
//         "Amount Remaining" : 50000,
//         "FY26 Request": 100000

const nonPersonnelColumns = [
    { title: 'FY26 Request', className: 'request', isCost: true },
    { title: 'Amount Remaining on Contract', className: 'remaining', isCost: true },
    { title: 'Service', className : 'service' },
    { title: 'Edit', className : 'edit' },
    { title : 'Account String', className : 'account-string'},
    { title : 'CPA #', className : 'cpa'},
    { title : 'End of Contract', className : 'contract-end'},
    { title: 'Recurring or One-Time', className: 'recurring'}

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
    await Table.Data.load();
    //after table is loaded, fill it
    Table.show();
    Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, "Edit");
    // assign cost classes
    Table.Columns.assignClasses(nonPersonnelColumns);
    // enable editing
    Table.Buttons.Edit.init(nonPersonnelRowOnEdit, Table.save);
}

function nonPersonnelRowOnEdit(){
    // make it editable
    Table.Cell.createTextbox('request');
    Table.Cell.createServiceDropdown();
}

