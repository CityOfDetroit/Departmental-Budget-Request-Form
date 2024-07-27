import { View } from '../view_class.js'

import FileUpload from "../../components/file_upload/file_upload.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";

export function loadUploadPage(){
    var page = new UploadView();
    page.visit();
}

class UploadView extends View {

    constructor() {
        super();
        this.page_state = 'upload';
        this.prompt = `Upload the baseline detail sheet given by your budget analyst.`;
        this.subtitle = 'Excel Upload';
        this.sidebar = false;
    }

    visit() {
        super.visit();
        // disable continue button until Excel file is uploaded and read
        NavButtons.Next.disable();
        FileUpload.show();
        FileUpload.init();
        NavButtons.Next.enable();
    }
}
