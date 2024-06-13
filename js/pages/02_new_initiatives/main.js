import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { showPrompt } from '../../components/prompt/prompt.js'

// Set up links to different pages
export function loadNewInitiatives() {
    hideWelcomeButtons();
    showPrompt();
}