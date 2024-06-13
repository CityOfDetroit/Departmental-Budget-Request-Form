import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'
import { loadNewInitiatives } from '../02_new_initiatives/main.js'

export function initializeWelcomePage(){

    updateSubtitle("Welcome");
    unhideWelcomeButtons();

    document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)

}