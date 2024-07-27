
import Prompt from '../../../components/prompt/prompt.js'
import Modal from '../../../components/modal/modal.js'
import Form from '../../../components/form/form.js'
import Table from '../../../components/table/table.js'
import Body from '../../../components/body/body.js'
import NavButtons from '../../../components/nav_buttons/nav_buttons.js'
import { nextPage } from '../../view_logic.js'
import Subtitle from '../../../components/header/header.js'
import Sidebar from '../../../components/sidebar/sidebar.js'
import { FundLookupTable, AccountString } from '../../../utils/data_utils/budget_data_handlers.js'

const explanation = `New initiative submissions will count as supplemental line items and will be the starting 
        point for a conversation with both OB and ODFS, who will help with the details.`

const dropdownOptions = ['N/A', 'One-Time', 'Recurring']

const initiativesCols = [
    { title: 'Initiative Name', className: 'init-name' },
    { title: 'Account String', className: 'account-string' },
    { title: 'Ballpark Total Expenses', className: 'total', isCost: true },
    { title: 'Personnel Cost', className: 'personnel', isCost: true },
    { title: 'Non-personnel Cost', className: 'nonpersonnel', isCost: true },
    { title: 'Revenue', className: 'revenue', isCost: true },
    { title: 'Revenue Type', className: 'rev-type' },
    { title: 'Edit', className : 'edit' },

    // hide the explanation columns
    { title: 'Q1', className: 'q1', hide: true },
    { title: 'Q2', className: 'q2', hide: true },
    { title: 'Q3', className: 'q3', hide: true },

    // hide the account string breakdown columns too
    { title: 'Appropriation Name', className: 'approp-name', hide: true },
    { title: 'Cost Center Name', className: 'cc-name',  hide: true },
    { title: 'Appropriation', className: 'approp', hide: true },
    { title: 'Cost Center', className: 'cc',  hide: true },
    { title: 'Fund Name', className: 'fund-name',  hide: true },
    { title: 'Fund', className: 'fund',  hide: true }
];

export function initializePageView() {
    // Prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();
    NavButtons.Next.enable();

    //table appearance
    Table.adjustWidth('100%');
    Table.Buttons.AddRow.updateText('Add new initiative');

    // remove fund selection
    localStorage.setItem("fund", '');

    // Load text
    Subtitle.update('New Initiatives');
    Prompt.Text.update('This is the place to propose new initiatives for FY26. ' + explanation);
    NavButtons.Next.enable
    // Prompt.Buttons.Left.updateText('Yes, propose a new initiative');
    // Prompt.Buttons.Right.updateText('No new initiatives');
    // clicking 'no new initialitives' will also take us to the next page
    Table.Buttons.AddRow.show();
    // Prompt.Buttons.Right.addAction(nextPage);
    // Prompt.Buttons.Left.addAction(NavButtons.Next.enable);
}

export function setUpModal() {
    // Initialize modal
    Modal.clear();
    Modal.Link.add('option1');
    Modal.Title.update('New initiative');
    Modal.Link.add('add-btn');
}

export function setUpForm() {
    // Set up form
    Form.new('modal-body');

    // general questions
    Form.NewField.shortText('Initiative Name:', 'init-name', true); 
    Form.NewField.longText('What is the business case for the Initiative?', 'q1', true);
    Form.NewField.longText(`Why is the initiative needed? What is the value-add to residents? 
        What is the Department’s plan for implementing the Initiative?`, 'q2', true);
    Form.NewField.longText(`Why can’t the Initiative be funded with the Department’s baseline budget?`, 'q3', true);

    // TODO: Edit to drop down
    Form.NewField.dropdown('Fund:', 'fund-name', FundLookupTable.listFundNames(), true);
    Form.NewField.dropdown('Appropriation (if known):', 'approp-name', FundLookupTable.getApprops(), true);
    Form.NewField.dropdown('Cost Center (if known):', 'cc-name', FundLookupTable.getCostCenters(), true);

    // Numbers
    Form.NewField.numericInput('What is your ballpark estimate of TOTAL ADDITONAL expenses associated with this initiative?', 
        'total', false);
    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'personnel', false);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'nonpersonnel', false);
    Form.NewField.numericInput('Estimate of ADDITONAL revenue (if applicable)?', 'revenue', false);
    Form.NewField.dropdown(`If there will be revenue, is it one-time or recurring?`, 
        'rev-type', dropdownOptions);


    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(submitNewRow);
}

function assignClasses() {
    // assign cost classes
    Table.Columns.assignClasses(initiativesCols)
}

export async function initializeInitTable(){
    
    // load table data from storage
    if(await Table.Data.load()) {
        // after table is loaded, fill it
        Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, "Edit");
        assignClasses();
        // show table
        Table.show();
        // enable editing
        Table.Buttons.Edit.init(rowOnEdit, Table.save);
    } else {
        Table.clear();
        console.log('no data');
    }
}

function rowOnEdit(){
    Table.Cell.createTextbox('total', true);
    Table.Cell.createTextbox('revenue', true);
    Table.Cell.createTextbox('personnel', true);
    Table.Cell.createTextbox('nonpersonnel', true);
    Table.Cell.createTextbox('init-name');
    Table.Cell.createDropdown('rev-type', dropdownOptions);
}

function submitNewRow(event){
    // get answers from form, hide form, show answers in table
    const responses = Form.fetchAllResponses(event);
    console.log(responses);

    // create account string columns
    responses['approp'] = AccountString.getNumber(responses['approp-name']);
    responses['cc'] = AccountString.getNumber(responses['cc-name']);
    responses['fund'] = AccountString.getNumber(responses['fund-name']);
    responses['account-string'] = AccountString.build(responses['approp-name'], responses['cc-name'], null, responses['fund']);
   
    // make sure it's not an empty response
    if (Object.values(responses)[0] != ''){
        Modal.hide();
        // add data to table
        Table.Rows.add(responses, initiativesCols);
        Table.save();
        initializeInitTable();
        Table.Buttons.AddRow.updateText('Add another new initiative');
    }
}

export function removeModalLinks(){
    Modal.Link.remove('option1');
    Modal.Link.remove('add-btn');
}

export function removePromptButtonListeners(){
    Prompt.Buttons.Right.removeAction(nextPage);
    Prompt.Buttons.Left.removeAction(NavButtons.Next.enable);
    Modal.clear();
}