import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'
import { loadNewInitiatives } from '../02_new_initiatives/main.js'
import { updatePageState } from '../../utils/storage-handlers.js'

export function initializeWelcomePage(){

    // record page state
    updatePageState('welcome');

    // page set up
    updateSubtitle("Welcome");
    unhideWelcomeButtons();

    // initialize links in buttons
    document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)

}