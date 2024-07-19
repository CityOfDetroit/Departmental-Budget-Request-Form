
import Prompt from '../../components/prompt/prompt.js'
import Modal from '../../components/modal/modal.js'
import Form from '../../components/form/form.js'
import Table from '../../components/table/table.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { nextPage } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'
import Sidebar from '../../components/sidebar/sidebar.js'

export function initializePageView() {
    // Prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();

    //table appearance
    Table.adjustWidth('70%');
    Table.Buttons.AddRow.updateText('Add another new initiative');

    // remove fund selection
    localStorage.setItem("fund", '');

    // Load text
    Subtitle.update('New Initiatives');
    Prompt.Text.update('Do you have any new initiatives for FY26?');
    Prompt.Buttons.Left.updateText('Yes');
    Prompt.Buttons.Right.updateText('No');
    // clicking 'no new initialitives' will also take us to the next page
    Prompt.Buttons.Right.addAction(nextPage);
    Prompt.Buttons.Left.addAction(NavButtons.Next.enable);
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
    Form.NewField.shortText('Initiative Name:', 'Initiative Name', true); 
    Form.NewField.longText(`Describe what the Initiative is and why it is needed and should be funded: 
        i). What is the business case for the Initiative?
        ii). Why is the initiative needed? What is the value-add to residents? What is the Department’s plan for implementing the Initiative?
        iii). Why can’t the Initiative be funded with the Department’s baseline budget?`, 'Explanation', true);

    Form.NewField.numericInput('What is your ballpark estimate of TOTAL ADDITONAL expenses associated with this initiative?', 'Ballpark Total Expenses', false);

    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'Personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'Non-personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL revenue (if applicable)?', 'Revenue', false);

    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(handleNewInitSubmission);
}

function assignClasses() {
    // record columns and their classes
    const initiativesCols = [
        { title: 'Initiative Name', className: 'init-name' },
        { title: `Explanation`, className: 'explanation' },
        { title: 'Ballpark Total Expenses', className: 'total', isCost: true },
        { title: 'Revenue', className: 'revenue', isCost: true },
        { title: 'Personnel Cost', className: 'personnel', isCost: true },
        { title: 'Non-personnel Cost', className: 'nonpersonnel', isCost: true }
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
    Table.Buttons.AddRow.show();
    NavButtons.Next.enable();
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