
import { updatePageState } from "../../utils/storage-handlers.js";
import { preparePageView, initializePersonnelTable } from "./helpers.js";

export function loadPersonnelPage(){

    updatePageState('personnel');
    preparePageView();
    initializePersonnelTable();

}

