import { updatePageState } from '../../utils/storage-handlers.js'
import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { updateSubtitle } from '../../components/header/header.js'
import { showPrompt, updatePrompt, updatePromptButtons, addPromptButtonAction } from '../../components/prompt/prompt.js'
import { showNavButtons, updateNavButtonLinks } from '../../components/nav_buttons/nav_buttons.js'
import { loadNewInitiatives } from '../02_new_initiatives/main.js'


export function loadRevenuePage() {

    //update page state
    updatePageState('revenue');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();

    // update page text
    updateSubtitle('Revenue Projections');
    // TODO: update to make dynamic
    updatePrompt('Your revenue projection for FY26 is $0');
    updatePromptButtons('Confirm and continue.', "This doesn't look right");

    // clicking 'confirm and continue' will also take us to the next page
    addPromptButtonAction('option1', loadNewInitiatives);

}