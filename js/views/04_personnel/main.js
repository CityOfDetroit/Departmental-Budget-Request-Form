import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView, initializePersonnelTable, setUpModal, setUpForm } from "./helpers.js";

export function loadPersonnelPage(){

    CurrentPage.update('personnel');
    preparePageView();
    initializePersonnelTable();

    setUpModal();
    setUpForm();
}

