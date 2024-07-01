import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import { initializePageView } from "../06_new_initiatives/helpers.js";

export function loadUploadPage(){
    //update page state
    updatePageState('upload');
    initializePageView();
    
}