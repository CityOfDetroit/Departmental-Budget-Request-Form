import Prompt from "../../components/prompt/prompt.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";
import Tooltip from "../../components/tooltip/tooltip.js";

const nonPersonnelColumns = [
    { title: 'FY26 Request', className: 'request', isCost: true },
    { title: 'Service', className : 'service' },
    { title: 'Edit', className : 'edit' },
    { title : 'Account String', className : 'account-string'},
    { title: 'Recurring or One-Time', className: 'recurring'},

    { title : 'CPA #', className : 'cpa'},

    // hidden columns used for calcs and info boxes
    { title: 'Appropriation Name', className: 'approp-name', hide: true },
    { title: 'Cost Center Name', className: 'cc-name',  hide: true },
    { title : 'Contract End Date', className : 'contract-end', hide:true},
    { title: 'Amount Remaining on Contract', className: 'remaining', isCost: true , hide: true},
    { title: 'Object Name', className: 'object-name', hide: true},
    { title: 'Vendor Name', className: 'vendor', hide: true},
    { title: 'Object Category', className: 'object-category', hide: true},
    { title: 'BPA/CPA Description', className: 'cpa-description', hide: true}  
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
        // show info boxes on click
        Tooltip.linkAllNP();
    } else {
        Prompt.Text.update('No non-personnel expenditures for this fund.')
    }
}

function nonPersonnelRowOnEdit(){
    // make it editable
    Table.Cell.createTextbox('request', true);
    Table.Cell.createServiceDropdown();
}

