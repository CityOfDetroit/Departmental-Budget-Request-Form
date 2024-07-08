import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView, initializeNonpersonnelTable } from "../05_nonpersonnel/helpers.js";

export function loadNonpersonnelPage(){

    updatePageState('nonpersonnel');
    preparePageView();
    initializeNonpersonnelTable()
}
