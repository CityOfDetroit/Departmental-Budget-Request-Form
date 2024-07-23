
import Prompt from '../../components/prompt/prompt.js'
import Body from "../../components/body/body.js";
import Subtitle from "../../components/header/header.js";
import { visitPage } from "../view_logic.js";
import { Accordion } from "../../components/accordion/accordion.js";
import { downloadXLSX } from "../../utils/data_utils/XLSX_handlers.js";
import { Baseline, CurrentFund } from '../../utils/data_utils/local_storage_handlers.js';
import { TARGET } from '../../init.js';
import { formatCurrency } from '../../utils/common_utils.js';

export function summaryView(){

    // show/hide elements
    Body.reset();
    Accordion.build();
    Accordion.show();

    // set fund to none
    CurrentFund.reset();

    // prompt buttons
    Prompt.Buttons.Right.updateText('Download Excel');
    Prompt.Buttons.Left.updateText('Start over with new Excel upload');
    // add button links
    Prompt.Buttons.Left.addAction(returnToWelcome);
    Prompt.Buttons.Right.addAction(downloadXLSX);

    // update page text
    Subtitle.update('Summary');
    compareToTarget()
}

function compareToTarget(){
    const baseline = new Baseline;
    if (baseline.total() <= TARGET){
        Prompt.Text.update(`Congrats! Your budget is below your target! 
            Edit any line items below or download your completed Excel.`);
        Prompt.show();
    } else {
        Prompt.Text.update(`Your budget is above your target of ${formatCurrency(TARGET)}. 
            Please expand the summary table below and edit line items until you meet your target. 
            When you meet the target, you will be able to download the Excel sheet.`);
        Prompt.Buttons.Right.disable();
        Prompt.show();
    }
}

const returnToWelcome = () => {visitPage('welcome')}

export function disablePromptButtons(){
    Prompt.Buttons.Left.removeAction(returnToWelcome);
    Prompt.Buttons.Right.removeAction(downloadXLSX);
    Prompt.Buttons.Right.enable();
}