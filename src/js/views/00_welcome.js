
import Welcome from '../components/welcome/welcome.js';
import { View } from './view_class.js';
import { visitPage } from './view_logic.js';

export class WelcomeView extends View {

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
        document.getElementById('step-upload').addEventListener('click', visitPage('upload'));
        document.getElementById('step-initiatives').addEventListener('click', visitPage('new-inits'))
        document.getElementById('step-revenue').addEventListener('click', visitPage('revenue'))
        document.getElementById('step-finish').addEventListener('click', visitPage('summary'))

    }

}

export default WelcomeView;
