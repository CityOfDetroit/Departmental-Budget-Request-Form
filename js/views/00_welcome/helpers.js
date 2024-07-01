 import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'
import { loadNewInitiatives } from '../06_new_initiatives/main.js'
import { loadSummaryPage } from '../07_summary/main.js'
import { loadBaselineLandingPage } from '../02_baseline_landing_page/main.js'
import { loadUploadPage } from '../01_upload/main.js'
import Body from '../../components/body/body.js'
 
export function initializePageView(){
    // page set up
    Body.clearAll();
    updateSubtitle("Welcome");
    unhideWelcomeButtons();
}

export function addLinks(){
    // initialize links in buttons
    document.getElementById('step-upload').addEventListener('click', loadUploadPage)
    document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)
    document.getElementById('step-revenue').addEventListener('click', loadBaselineLandingPage)
    document.getElementById('step-finish').addEventListener('click', loadSummaryPage)

}
