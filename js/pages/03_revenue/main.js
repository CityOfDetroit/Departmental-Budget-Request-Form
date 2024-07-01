import { updatePageState } from '../../utils/storage-handlers.js'
import { updateSubtitle } from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import { nextPage, showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import { formatCurrency } from '../../utils/utils.js'

import { REVENUE } from '../../init.js'
import Body from '../../components/body/body.js'

export function loadRevenuePage() {

    //update page state
    updatePageState('revenue');

    // prepare page view
    Body.clearAll();
    showNavButtons();

    // update page text
    updateSubtitle('Revenue Projections');
    // TODO: update to make dynamic
    Prompt.Text.update(`Your revenue projection for FY26 is ${formatCurrency(REVENUE, true)}`);
    Prompt.Buttons.Left.updateText('Confirm and continue.');
    Prompt.Buttons.Right.updateText("This doesn't look right");

    // clicking 'confirm and continue' will also take us to the next page
    Prompt.Buttons.Left.addAction(nextPage);
    // TODO: allow user to edit revenue here
    // addPromptButtonAction('option2', nextPage);

}