import Prompt from '../../components/prompt/prompt.js'
import { formatCurrency } from '../../utils/common_utils.js'
import { REVENUE } from '../../init.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { pauseAndContinue } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'
import Modal from '../../components/modal/modal.js'
import Form from '../../components/form/form.js'
import Sidebar from '../../components/sidebar/sidebar.js'

export function preparePageView(){
    // prepare page view
    Body.reset();
    NavButtons.show();

    // update page text
    Subtitle.update('Revenue Projections');
    // TODO: update to make dynamic
    Prompt.Text.update(`Your revenue projection for FY26 is ${formatCurrency(REVENUE, true)}`);
    Prompt.Buttons.Left.updateText('Confirm');
    Prompt.Buttons.Right.updateText("This doesn't look right");
}

export function setUpNavButtons(){
    // clicking 'confirm' will also take us to the next page
    Prompt.Buttons.Left.addAction(pauseAndContinue);
    // TODO: allow user to edit revenue here
    Modal.Link.add('option2');
    handleErrorComment();
}

export function removButtonEvents(){
    // remove event listeners on prompt buttons
    Prompt.Buttons.Left.removeAction(pauseAndContinue);
    Modal.Link.remove('option2');
}

function handleErrorComment(){
    var fund = localStorage.getItem("fund");
    Modal.clear();
    Modal.Title.update(`Comment on ${fund} Revenue`);
    Form.new('modal-body');
    Form.NewField.longText('Explain your concerns here. Someone from the revenue team will follow up with you.',
         'revenue-comment', true); 
    Form.SubmitButton.add();
    // save comment on submission
    handleFormSubmissions();
}

function handleFormSubmissions(event){
    // initialize form submission
    const modal = document.getElementById('main-modal');
    modal.addEventListener('submit', function(event) {
        event.preventDefault();
        const responses = Form.fetchAllResponses(event);
        // TODO: save comment here

        // hide modal, update page, and enable continue
        Modal.hide();
        Prompt.Buttons.hide();
        Prompt.Text.update('Your comment has been received.');
        NavButtons.Next.enable();
    });
}

export function updateSidebar(){
    Sidebar.updateStat('baseline-revenue', REVENUE);
}