import { updatePageState } from "../../utils/storage-handlers.js";
import { initializePageView } from "../06_new_initiatives/helpers.js";

export function loadUploadPage(){
    //update page state
    updatePageState('upload');
    initializePageView();
    
}