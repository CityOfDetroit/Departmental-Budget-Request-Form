import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'

export function initializeWelcomePage(){

    updateSubtitle("Welcome");
    unhideWelcomeButtons();


}