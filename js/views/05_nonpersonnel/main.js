import { updatePageState } from "../../utils/storage-handlers.js";
import { preparePageView, initializeNonpersonnelTable } from "../05_nonpersonnel/helpers.js";

export function loadNonpersonnelPage(){

    updatePageState('nonpersonnel');
    preparePageView();
    initializeNonpersonnelTable()
}
