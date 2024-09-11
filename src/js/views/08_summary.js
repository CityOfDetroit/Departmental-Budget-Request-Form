import CurrentFund from '../models/current_fund.js';
import Baseline from '../models/baseline.js';
import { Accordion } from "../components/accordion/accordion.js";
import { formatCurrency } from '../utils/common_utils.js';
import { View } from "./view_class.js";
import Prompt from "../components/prompt/prompt.js";
import { downloadXLSX } from "../utils/XLSX_handlers.js";
import WelcomeView from './00_welcome.js';

export function compareToTarget(){
    const baseline = new Baseline;
    if (baseline.total() <= Baseline.target()){
        Prompt.Text.update(`Congrats! Your budget is below your target! 
            Edit any line items below or download your completed Excel.`);
    } else {
        Prompt.Text.update(`Your budget is above your target of ${formatCurrency(Baseline.target())}. 
            Please expand the summary table below and edit line items to meet your departmental budget target.`);
        // Excel download block toggled off
        // Prompt.Buttons.Right.disable();
    }
    Prompt.show();
}

function returnToWelcome() {
    const welcome = new WelcomeView();
    welcome.visit();
};

export class SummaryView extends View {

    constructor() {
        super();
        this.page_state = 'summary';
        this.subtitle = 'Summary';
        this.sidebar = false;
    }

    visit() {
        super.visit();

        // reset fund
        CurrentFund.reset();

        // show summary accordion
        Accordion.build();
        Accordion.show();

        // add prompt buttons
        Prompt.Buttons.Right.updateText('Download Excel');
        Prompt.Buttons.Left.updateText('Start over with new Excel upload');
        // add button links
        Prompt.Buttons.Left.addAction(returnToWelcome);
        Prompt.Buttons.Right.addAction(downloadXLSX);

        // update prompt text depending on target matching
        compareToTarget();
    }

    cleanup() {
        // delete event listeners
        Prompt.Buttons.Left.removeAction(returnToWelcome);
        Prompt.Buttons.Right.removeAction(downloadXLSX);
        Prompt.Buttons.Right.enable();
    }
}

export default SummaryView;