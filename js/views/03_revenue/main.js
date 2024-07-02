import { updatePageState } from '../../utils/data_utils/local_storage_handlers.js'
import Prompt from '../../components/prompt/prompt.js'
import { formatCurrency } from '../../utils/common_utils.js'
import { REVENUE } from '../../init.js'
import Body from '../../components/body/body.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import { nextPage } from '../view_logic.js'
import Subtitle from '../../components/header/header.js'

export function loadRevenuePage() {

    //update page state
    updatePageState('revenue');
    localStorage.setItem("fund", '');

    // prepare page view
    Body.reset();
    NavButtons.show();

    // update page text
    Subtitle.update('Revenue Projections');
    // TODO: update to make dynamic
    Prompt.Text.update(`Your revenue projection for FY26 is ${formatCurrency(REVENUE, true)}`);
    Prompt.Buttons.Left.updateText('Confirm');
    Prompt.Buttons.Right.updateText("This doesn't look right");

    // clicking 'confirm' will also take us to the next page
    Prompt.Buttons.Left.addAction(nextPage);
    // TODO: allow user to edit revenue here
    Prompt.Buttons.Right.addAction(handleRevenueEdit);
}

function handleRevenueEdit() {
    NavButtons.Next.enable();
}

export function cleanupRevenuePage() {
    // remove event listeners on prompt buttons
    Prompt.Buttons.Left.removeAction(nextPage);
    Prompt.Buttons.Right.removeAction(handleRevenueEdit);
};