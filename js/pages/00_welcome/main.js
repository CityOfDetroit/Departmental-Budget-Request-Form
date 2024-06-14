import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'
import { loadNewInitiatives } from '../02_new_initiatives/main.js'
import { updatePageState } from '../../utils/storage-handlers.js'
import { hidePrompt } from '../../components/prompt/prompt.js'
import { hideNavButtons } from '../../components/nav_buttons/nav_buttons.js'

export function initializeWelcomePage(){

    // record page state
    updatePageState('welcome');
 
    // page set up
    updateSubtitle("Welcome");
    unhideWelcomeButtons();
    hidePrompt();
    hideNavButtons();

    // initialize links in buttons
    document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)

}