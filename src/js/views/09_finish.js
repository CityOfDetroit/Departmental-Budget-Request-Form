import CurrentFund from '../models/current_fund.js';
import { View } from "./view_class.js";
import Prompt from "../components/prompt/prompt.js";
import { downloadXLSX } from "../utils/XLSX_handlers.js";
import WelcomeView from './00_welcome.js';
import NavButtons from '../components/nav_buttons/nav_buttons.js';

function returnToWelcome() {
    localStorage.clear();
    const welcome = new WelcomeView();
    welcome.visit();
};

export class FinishView extends View {

    constructor() {
        super();
        this.page_state = 'finish';
        this.subtitle = 'Finish';
        this.sidebar = false;
        // todo toggle to false
        this.navButtons = true;
        this.prompt = `Congratulations! A copy of your completed Excel file has been downloaded.
            Download another copy below, or start over with a new Excel upload. Please email the Excel download 
            along with the rest of you budget submission.`;
    }

    visit() {
        super.visit();

        // reset fund
        CurrentFund.reset();

        // add prompt buttons
        Prompt.Buttons.Right.updateText('Download completed Excel');
        Prompt.Buttons.Left.updateText('Start over with new Excel file');
        // add button links
        Prompt.Buttons.Left.addAction(returnToWelcome);
        Prompt.Buttons.Right.addAction(downloadXLSX);
        Prompt.show();

        // hide next button
        NavButtons.Next.hide();

    }

    cleanup() {
        // delete event listeners
        Prompt.Buttons.Left.removeAction(returnToWelcome);
        Prompt.Buttons.Right.removeAction(downloadXLSX);
        Prompt.Buttons.Right.enable();
    }
}

export default FinishView;