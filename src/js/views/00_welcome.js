
import Welcome from '../components/welcome/welcome.js';
import { FISCAL_YEAR } from '../constants/budget_constants.js';
import { View } from './view_class.js';
import { visitPage } from './view_logic.js';

export class WelcomeView extends View {

    constructor() {
        super();
        this.page_state = 'welcome';
        this.subtitle = 'Welcome';
        this.sidebar = false;
        this.navButtons = false;
        this.prompt = `This tool will help you prepare your budget request submission for fiscal year 
            20${FISCAL_YEAR}. Start by uploading the detail sheet sent to you by your budget analyst. This
            tool will use the data in that sheet to pre-fill your submission with last year's request.
            <br><br>
            Then, you will be guided through each fund to make any adjustments from last year's request. 
            As you 
            make these adjustments, you will see a sidebar tracking your total expenditures by fund and your target
            baseline for the general fund. 
            <br><br>
            Once you get through all funds and set your request at or below the 
            target, you will be able to download a filled version of the Excel detail sheet. Downloading 
            this file is the only permanent way to save your progress.`
    }

    visit() {
        super.visit();
        
        // show welcome section
        Welcome.show();

        // initialize links in buttons
        document.getElementById('step-upload').addEventListener('click', () => visitPage('upload'));
        // document.getElementById('step-initiatives').addEventListener('click', () => visitPage('new-inits'));
        // document.getElementById('step-revenue').addEventListener('click', () => visitPage('baseline-landing'));
        // document.getElementById('step-finish').addEventListener('click', () => visitPage('summary'));

    }

}

export default WelcomeView;
