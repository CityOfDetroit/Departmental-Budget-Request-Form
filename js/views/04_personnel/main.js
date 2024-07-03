import { updatePageState } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView, initializePersonnelTable, setUpModal, setUpForm } from "./helpers.js";

export function loadPersonnelPage(){

    updatePageState('personnel');
    preparePageView();
    initializePersonnelTable();

    setUpModal();
    setUpForm();
}

