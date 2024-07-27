import Prompt from '../../../components/prompt/prompt.js'
import Body from '../../../components/body/body.js'
import NavButtons from '../../../components/nav_buttons/nav_buttons.js'
import Subtitle from '../../../components/header/header.js'
import Sidebar from '../../../components/sidebar/sidebar.js'
import Table from '../../../components/table/table.js'
import Tooltip from '../../../components/tooltip/tooltip.js'

const revenueColumns = [
    { title: 'Edit', className : 'edit' },
    { title : 'Account String', className : 'account-string'},
    { title: 'Recurring or One-Time', className: 'recurring'},
    { title: 'Object Category', className: 'object-category'},
    { title: 'Departmental Request Total', className: 'request', isCost: true},
    { title: 'Departmental Request Notes', className: 'notes'},

    // hidden columns used for calcs and info boxes
    { title: 'Appropriation Name', className: 'approp-name', hide: true },
    { title: 'Cost Center Name', className: 'cc-name',  hide: true },
    { title: 'Object Name', className: 'object-name', hide: true}
];

export function preparePageView(){
    // prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();
    Table.adjustWidth('100%');

    // update page text
    Subtitle.update('Revenues');

    // set up table
    initializeRevTable()

    // enable continue button
    NavButtons.Next.enable();

    Prompt.Text.update('Review and edit revenue line items.');

}

export async function initializeRevTable(){
    // load table data from storage
    if(await Table.Data.load()) {
        //after table is loaded, fill it
        Table.show();
        Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, "Edit");
        // assign cost classes
        Table.Columns.assignClasses(revenueColumns);
        // enable editing
        Table.Buttons.Edit.init(revRowOnEdit, Table.save);
        // show info boxes on click
        Tooltip.linkAll();
    } else {
        Prompt.Text.update('No revenues for this fund.')
    }
}

function revRowOnEdit(){
    // make it editable
    Table.Cell.createTextbox('request', true);
    Table.Cell.createTextbox('notes');
    Table.Cell.createDropdown('recurring', ['One-Time', 'Recurring']);
}