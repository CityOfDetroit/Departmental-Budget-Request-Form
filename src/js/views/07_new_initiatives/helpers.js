
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

    // Numbers
    Form.NewField.numericInput('What is your ballpark estimate of TOTAL ADDITONAL expenses associated with this initiative?', 'Ballpark Total Expenses', false);
    // TODO: Edit to drop down
    Form.NewField.shortText('Relevant account string (if known)?', 'Account String', false);
    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'Personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'Non-personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL revenue (if applicable)?', 'Revenue', false);
    Form.NewField.dropdown(`If there will be revenue, is it one-time or recurring?`, 'One-time v. Recurring', ['N/A', 'One-Time', 'Recurring']);


    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(handleNewInitSubmission);
}

function assignClasses() {
    // record columns and their classes
    const initiativesCols = [
        { title: 'Initiative Name', className: 'init-name' },
        { title: 'Ballpark Total Expenses', className: 'total', isCost: true },
        { title: 'Revenue', className: 'revenue', isCost: true },
        { title: 'Personnel Cost', className: 'personnel', isCost: true },
        { title: 'Non-personnel Cost', className: 'nonpersonnel', isCost: true },
        { title: 'Q1', className: 'q1' },
        { title: 'Q2', className: 'q2' },
        { title: 'Q3', className: 'q3' },
        { title: 'One-time v. Recurring', className: 'rev-type' },
    ];

    // assign cost classes
    Table.Columns.assignClasses(initiativesCols)
}

export async function initializeInitTable(){
    Table.clear();
    // load table data from storage
    if(await Table.Data.load()) {
        //after table is loaded, fill it
        assignClasses();
        tableView();
    }
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
        tableView();
    }
}

function tableView() {
    // change page view
    Table.show();
    Modal.hide();
    Prompt.hide();
    assignClasses();
    NavButtons.Next.enable();
    Table.Buttons.AddRow.updateText('Add another new initiative');
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