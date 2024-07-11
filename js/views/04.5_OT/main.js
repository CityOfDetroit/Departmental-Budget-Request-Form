
import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView } from './helpers.js';

export function loadOTPage(){
    //update page state
    CurrentPage.update('overtime');
    preparePageView();
    
}