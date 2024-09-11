
import Welcome from '../../../components/welcome/welcome.js';

import { loadUploadPage } from '../01_upload/main.js';
import { loadNewInitiatives } from '../07_new_initiatives/main.js';
import { loadBaselineLandingPage } from '../02_baseline_landing_page/main.js';
import { loadSummaryPage } from '../../08_summary.js';

import { View } from '../../view_class.js';

export function initializeWelcomePage(){

    var page = new WelcomeView();
    page.visit();

}

class WelcomeView extends View {

    constructor() {
        super();
        this.page_state = 'welcome';
        this.subtitle = 'Welcome';
        this.sidebar = false;
        this.navButtons = false;
    }

    visit() {
        super.visit();
        
        // show welcome section
        Welcome.show();

        // initialize links in buttons
        document.getElementById('step-upload').addEventListener('click', loadUploadPage)
        document.getElementById('step-initiatives').addEventListener('click', loadNewInitiatives)
        document.getElementById('step-revenue').addEventListener('click', loadBaselineLandingPage)
        document.getElementById('step-finish').addEventListener('click', loadSummaryPage)

    }

}
