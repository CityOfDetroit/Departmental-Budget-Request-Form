import Subtitle from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Body from "../../components/body/body.js";
import { fetchAndProcessExcel } from '../../utils/data_utils/XLSX_handlers.js';
import { DATA_ROOT } from '../../init.js';

export function initializePageView() {

    // remove fund selection
    localStorage.setItem("fund", '');

    // prepare page view
    Body.reset();
    NavButtons.show();

    // update page text
    Subtitle.update('Excel Upload');

    // TODO: update to make upload actually work
    Prompt.Text.update(`Placeholder for Excel Upload`);
    Prompt.Buttons.Left.updateText('Upload');
    Prompt.Buttons.Left.show();
    Prompt.Buttons.Left.addAction(uploadExcelAction);
}

async function uploadExcelAction() {
    await fetchAndProcessExcel(DATA_ROOT + 'sample_detail_sheet.xlsx');
    NavButtons.Next.enable();
}