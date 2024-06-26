 
import { hidePrompt } from '../../components/prompt/prompt.js'
import { hideNavButtons } from '../../components/nav_buttons/nav_buttons.js'
import Sidebar from '../../components/sidebar/sidebar.js'
import Table from '../../components/table/table.js'
import { updateSubtitle } from '../../components/header/header.js'
import { unhideWelcomeButtons } from '../../components/welcome/welcome.js'
import { loadNewInitiatives } from '../06_new_initiatives/main.js'
import { loadRevenuePage } from '../03_revenue/main.js'
import { loadPersonnelPage } from '../04_personnel/main.js'
import { loadSummaryPage } from '../07_summary/main.js'
import { loadBaselineLandingPage } from '../02_baseline_landing_page/main.js'
import { loadUploadPage } from '../01_upload/main.js'
 
export function initializePageView(){
    // page set up
    Table.Display.hide();
    Sidebar.hide();
    updateSubtitle("Welcome");
    unhideWelcomeButtons();
    hidePrompt();
    hideNavButtons();
}

export function addLinks(){
    // initialize links in buttons
    document.getElementById('step-upload').addEventListener('click', loadUploadPage)
    document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)
    document.getElementById('step-revenue').addEventListener('click', loadBaselineLandingPage)
    document.getElementById('step-finish').addEventListener('click', loadSummaryPage)

}
