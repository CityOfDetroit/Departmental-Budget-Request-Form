import Subtitle from '../../../components/header/header.js'
import Prompt from '../../../components/prompt/prompt.js'
import NavButtons from '../../../components/nav_buttons/nav_buttons.js'
import Body from "../../../components/body/body.js";
import { FileUpload } from '../../../components/file_upload/file_upload.js';

export function initializePageView() {

    // remove fund selection
    localStorage.setItem("fund", '');

    // prepare page view
    Body.reset();
    NavButtons.show();
    FileUpload.show();

    // update page text
    Subtitle.update('Excel Upload');
    Prompt.Text.update(`Upload the baseline detail sheet given by your budget analyst.`);

    // show and initialize file upload; enable continue after file saved in local storage 
    FileUpload.init();
    NavButtons.Next.enable();
}