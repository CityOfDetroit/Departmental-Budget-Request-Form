import Prompt from "../../components/prompt/prompt.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import Table from "../../components/table/table.js";
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";
import Tooltip from "../../components/tooltip/tooltip.js";
import Modal from "../../components/modal/modal.js";
import Form from "../../components/form/form.js";
import { ObjectCategories, Services, AccountString } from "../../utils/data_utils/budget_data_handlers.js";
import { FundLookupTable } from "../../utils/data_utils/budget_data_handlers.js";
import { unformatCurrency } from "../../utils/common_utils.js";

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
    { title: 'Appropriation', className: 'approp', hide: true },
    { title: 'Cost Center', className: 'cc',  hide: true },
    { title: 'Contract End Date', className: 'contract-end', hide:true},
    { title: 'Amount Remaining on Contract', className: 'remaining', isCost: true , hide: true},
    { title: 'Object Name', className: 'object-name', hide: true},
    { title: 'Object', className: 'object', hide: true},
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
    Prompt.Text.update('Review and edit non-personnel line items.');
    NavButtons.Next.enable();

    // form for new row
    setUpModal();
    setUpForm();

    // show new row button
    Table.Buttons.AddRow.updateText("Add new non-personnel item");
    Table.Buttons.AddRow.show()
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
        // show detail buttons
        Tooltip.linkAll();
    } else {
        Prompt.Text.update('No non-personnel expenditures for this fund.')
    }
}

function nonPersonnelRowOnEdit(){
    // make it editable
    Table.Cell.createTextbox('request', true);
    Table.Cell.createServiceDropdown();
    Table.Cell.createDropdown('recurring', ['One-Time', 'Recurring']);
}

export function setUpModal() {
    // Initialize modal
    Modal.clear();
    Modal.Link.add('add-btn');
    Modal.Title.update('New non-personnel item');
}

export function setUpForm() {
    // Set up form
    Form.new('modal-body');
    Form.NewField.dropdown('Appropriation:', 'approp-name', FundLookupTable.getApprops(), true);
    Form.NewField.dropdown('Cost Center:', 'cc-name', FundLookupTable.getCostCenters(), true);
    Form.NewField.dropdown('Object Category:', 'object-category', ObjectCategories.list, true);
    // TODO: maybe give dropdown based on selected obj category
    Form.NewField.shortText('Object Number (if known):', 'object', false);
    Form.NewField.dropdown('Service', 'service', Services.list(), true);
    Form.NewField.longText('Describe your new request:', 'description', true);
    Form.NewField.dropdown('Recurring or One-Time', 'recurring', ['Recurring', 'One-Time'], true); 
    Form.NewField.shortText('Amount requested:', 'request', true);
    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(submitNewRow);
}


function submitNewRow(event){        
    // get answers from form, hide form, show answers in table
    const responses = Form.fetchAllResponses(event);
    // edit inputs from modal
    responses['avg-salary'] = unformatCurrency(responses['avg-salary']);
    responses['fringe'] = parseFloat(responses['fringe']) / 100;
    // create account string
    responses['account-string'] = AccountString.build(responses['approp-name'], responses['cc-name'], responses['object']);
    responses['approp'] = AccountString.getNumber(responses['approp-name']);
    responses['cc'] = AccountString.getNumber(responses['cc-name']);
    // TODO: build out lookup table from meta.obj tab from detail sheet?
    responses['object-name'] = responses['object'];

    // make sure it's not an empty response
    if (Object.values(responses)[0] != ''){
        // change page view
        Modal.hide();
        // add data to table
        Table.Rows.add(responses);
        Table.save();
        initializeNonpersonnelTable();

    }

}
