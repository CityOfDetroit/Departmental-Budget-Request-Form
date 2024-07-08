
import Prompt from '../../components/prompt/prompt.js'
import Modal from '../../components/modal/modal.js'
import Form from '../../components/form/form.js'
import Table from '../../components/table/table.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { pauseAndContinue } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'
import Sidebar from '../../components/sidebar/sidebar.js'

export function initializePageView() {
    // Prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();

    // Load text
    Subtitle.update('New Initiatives');
    Prompt.Text.update('Do you have any new initiatives for FY26?');
    Prompt.Buttons.Left.updateText('Yes');
    Prompt.Buttons.Right.updateText('No');
    // clicking 'no new initialitives' will also take us to the next page
    Prompt.Buttons.Right.addAction(pauseAndContinue);
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
    Form.NewField.longText('Explain why this initiative is necessary and describe its potential impact.', 'Explanation', true);

    Form.NewField.numericInput('Estimate of ADDITONAL revenue associated with this initiative?', 'Revenue', false);
    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'Personnel Cost', false);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'Non-personnel Cost', false);

    // TODO: implement this option
    // Form.NewField.numericInput(`If you cannot answer the above, please provide a ballpark estimate of 
    //     the TOTAL ADDITONAL cost associated with this initiative`,
    //      'Ballpark Total', false);

    Form.SubmitButton.add();
    // Initialize form submission to table data
    handleFormSubmissions();
}

export function setUpTable() {
    // Set up table
    Table.clear();
    Table.adjustWidth('70%');
    Table.Buttons.AddRow.updateText('Add another new initiative');
}

function assignClasses() {
    // record columns and their classes
    const personnelColumns = [
        { title: 'Initiative Name', className: 'init-name' },
        { title: `Explanation`, className: 'explanation' },
        { title: 'Revenue', className: 'revenue', isCost: true },
        { title: 'Personnel Cost', className: 'personnel', isCost: true },
        { title: 'Non-personnel Cost', className: 'nonpersonnel', isCost: true }
    ];

    // assign cost classes
    Table.Columns.assignClasses(personnelColumns)
}

export function handleFormSubmissions(event){
        // initialize form submission
        const modal = document.getElementById('main-modal');
        modal.addEventListener('submit', function(event) {
            event.preventDefault();
            // get answers from form, hide form, show answers in table
            const responses = Form.fetchAllResponses(event);
            // make sure it's not an empty response
            if (Object.values(responses)[0] != ''){
                // change page view
                Modal.hide();
                Prompt.hide();
        
                // add data to table
                Table.Rows.add(responses);
                assignClasses();
                Table.show();
                Table.Buttons.AddRow.show();
                // TODO: save table data

                // add date to sidebar
                updateSidebar(responses);
                }

        })
}

function updateSidebar(responses){
    Sidebar.incrementStat('supp-revenue', responses['Revenue']);
    Sidebar.incrementStat('supp-personnel', responses['Personnel Cost']);
    Sidebar.incrementStat('supp-nonpersonnel', responses['Non-personnel Cost']);
}

export function removeModalLinks(){
    Modal.Link.remove('option1');
    Modal.Link.remove('add-btn');
}

export function removePromptButtonListeners(){
    Prompt.Buttons.Right.removeAction(pauseAndContinue);
    Prompt.Buttons.Left.removeAction(NavButtons.Next.enable);
}