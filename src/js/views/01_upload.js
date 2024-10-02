import { View } from './view_class.js'

import FileUpload from "../components/file_upload/file_upload.js";
import NavButtons from '../components/nav_buttons/nav_buttons.js';

export class UploadView extends View {

    constructor() {
        super();
        this.page_state = 'upload';
        this.prompt = `Upload the baseline detail sheet given by your budget analyst.`;
        this.subtitle = 'Excel Upload';
        this.sidebar = false;
    }

    visit() {
        super.visit();
        FileUpload.show();
        FileUpload.init();
    }
}

export default UploadView;