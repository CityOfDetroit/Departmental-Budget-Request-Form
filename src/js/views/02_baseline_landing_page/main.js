import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView, initializeFundTable } from "../02_baseline_landing_page/helpers.js";


export function loadBaselineLandingPage(){
    //update page state
    CurrentPage.update('baseline-landing');
    preparePageView();
    initializeFundTable();
}
