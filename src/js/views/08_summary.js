import CurrentFund from '../models/current_fund.js';
import Baseline from '../models/baseline.js';
import { Accordion } from "../components/accordion/accordion.js";
import { formatCurrency } from '../utils/common_utils.js';
import { View } from "./view_class.js";
import Prompt from "../components/prompt/prompt.js";
import { downloadXLSX } from "../utils/XLSX_handlers.js";
import NavButtons from '../components/nav_buttons/nav_buttons.js';
import { delay } from '../utils/common_utils.js';

export function compareToTarget(){
    const baseline = new Baseline;
    if (baseline.genFundTotal() <= Baseline.target()){
        Prompt.Text.update(`Your General Fund budget is below your target! 
            Edit any line items below or continue to the final page.`);
    } else {
        Prompt.Text.update(`Your General Fund budget is above your GF target of ${formatCurrency(Baseline.target())}. 
            Please expand the summary table below and edit line items until you meet your target. 
            When you meet the target, you will be able to continue to the final page.`);
        NavButtons.Next.disable();
    }
}

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

        // update prompt text depending on target matching
        compareToTarget();

        // force Excel download on next button
        NavButtons.Next.addAction(downloadXLSX);

    }

    async cleanup() {
        // delete event listeners
        // delay to make sure download happens before event listener is removed
        await delay(100)
        NavButtons.Next.removeAction(downloadXLSX);
    }
}

export default SummaryView;