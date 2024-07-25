
import Prompt from '../../components/prompt/prompt.js'
import Modal from '../../components/modal/modal.js'
import Form from '../../components/form/form.js'
import Table from '../../components/table/table.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { nextPage } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'
import Sidebar from '../../components/sidebar/sidebar.js'

const explanation = `New initiative submissions will count as supplemental line items and will be the starting 
        point for a conversation with both OB and ODFS, who will help with the details.`

const dropdownOptions = ['N/A', 'One-Time', 'Recurring']

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
    Form.NewField.shortText('Initiative Name:', 'Initiative Name', true); 
    Form.NewField.longText('What is the business case for the Initiative?', 'Q1', true);
    Form.NewField.longText(`Why is the initiative needed? What is the value-add to residents? 
        What is the Department’s plan for implementing the Initiative?`, 'Q2', true);
    Form.NewField.longText(`Why can’t the Initiative be funded with the Department’s baseline budget?`, 'Q3', true);

    // TODO: Edit to drop down
    Form.NewField.dropdown('Appropriation (if known):', 'approp-name', FundLookupTable.getApprops(), true);
    Form.NewField.dropdown('Cost Center (if known):', 'cc-name', FundLookupTable.getCostCenters(), true);

    // Numbers
    Form.NewField.numericInput('What is your ballpark estimate of TOTAL ADDITONAL expenses associated with this initiative?', 
        'Ballpark Total Expenses', false);
    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'Personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'Non-personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL revenue (if applicable)?', 'Revenue', false);
    Form.NewField.dropdown(`If there will be revenue, is it one-time or recurring?`, 
        'One-time v. Recurring', dropdownOptions);


    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(handleNewInitSubmission);
}

function assignClasses() {
    // record columns and their classes
    const initiativesCols = [
        { title: 'Initiative Name', className: 'init-name' },
        { title: 'Account String', className: 'account-string' },
        { title: 'Ballpark Total Expenses', className: 'total', isCost: true },
        { title: 'Revenue', className: 'revenue', isCost: true },
        { title: 'Personnel Cost', className: 'personnel', isCost: true },
        { title: 'Non-personnel Cost', className: 'nonpersonnel', isCost: true },
        { title: 'One-time v. Recurring', className: 'rev-type' },
        { title: 'Edit', className : 'edit' },

        // hide the explanation columns
        { title: 'Q1', className: 'q1', hide: true },
        { title: 'Q2', className: 'q2', hide: true },
        { title: 'Q3', className: 'q3', hide: true },
    ];

    // assign cost classes
    Table.Columns.assignClasses(initiativesCols)
}

export async function initializeInitTable(){
    Table.clear();
    // load table data from storage
    if(await Table.Data.load()) {
        //after table is loaded, fill it
        Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, "Edit");
        assignClasses();
        // enable editing
        Table.Buttons.Edit.init(rowOnEdit, Table.save);
        // show table
        Table.show();
    }
}

function rowOnEdit(){
    Table.Cell.createTextbox('total', true);
    Table.Cell.createTextbox('revenue', true);
    Table.Cell.createTextbox('personnel', true);
    Table.Cell.createTextbox('nonpersonnel', true);
    Table.Cell.createTextbox('account-string');
    Table.Cell.createTextbox('init-name');
    Table.Cell.createDropdown('rev-type', dropdownOptions);
}

function handleNewInitSubmission(event){
    // get answers from form, hide form, show answers in table
    const responses = Form.fetchAllResponses(event);
    // make sure it's not an empty response
    if (Object.values(responses)[0] != ''){
        // add data to table
        Table.Rows.add(responses);
        // save it
        Table.save();
        // show updated table
        initializeInitTable();
        Modal.hide();
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