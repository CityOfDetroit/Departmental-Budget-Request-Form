import { updatePageState } from '../../utils/storage-handlers.js'
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, updatePromptButtons, addPromptButtonAction } from '../../components/prompt/prompt.js'
import { nextPage, showNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import Table from '../../components/table/table.js'
import Sidebar from '../../components/sidebar/sidebar.js'
import { formatCurrency } from '../../utils/utils.js'
import { removeModalLink } from '../../components/modal/modal.js'

import { REVENUE } from '../../init.js'

export function loadRevenuePage() {

    //update page state
    updatePageState('revenue');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    Table.hide();
    Sidebar.hide();
    removeModalLink('option1', 'main-modal');

    // update page text
    updateSubtitle('Revenue Projections');
    // TODO: update to make dynamic
    updatePrompt(`Your revenue projection for FY26 is ${formatCurrency(REVENUE, true)}`);
    updatePromptButtons('Confirm and continue.', "This doesn't look right");

    // clicking 'confirm and continue' will also take us to the next page
    addPromptButtonAction('option1', nextPage);
    // TODO: allow user to edit revenue here
    // addPromptButtonAction('option2', nextPage);

}