
import Prompt from '../../components/prompt/prompt.js'
import Modal from '../../components/modal/modal.js'
import Form from '../../components/form/form.js'
import Table from '../../components/table/table.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { nextPage } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'

export function initializePageView() {
    // Prepare page view
    Body.reset();
    NavButtons.show();
    Prompt.Buttons.Right.addAction(nextPage);

    // Load text
    Subtitle.update('New Initiatives');
    Prompt.Text.update('Do you have any new initiatives for FY26?');
    Prompt.Buttons.Left.updateText('Yes');
    Prompt.Buttons.Right.updateText('No');
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
    Form.NewField.numericInput('Estimate of ADDITONAL revenue associated with this initiative?', 'Revenue', true);
    Form.NewField.numericInput('Estimate of ADDITONAL personnel cost?', 'Personnel Cost', true);
    Form.NewField.numericInput('Estimate of ADDITONAL nonpersonnel cost?', 'Non-personnel Cost', true);
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
                Table.show();
                Table.Buttons.AddRow.show();
                // TODO: save table data
                // TODO: edit cost to show currency correctly
                }

        })
}

export function removeModalLinks(){
    Modal.Link.remove('option1');
    Modal.Link.remove('add-btn');
}