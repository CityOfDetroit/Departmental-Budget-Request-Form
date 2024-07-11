import { CurrentPage } from '../../utils/data_utils/local_storage_handlers.js'
import { preparePageView, removeButtonEvents, setUpNavButtons } from './helpers.js'

export function loadRevenuePage() {

    //update page state
    CurrentPage.update('revenue');
    preparePageView();
    setUpNavButtons();
}

export function cleanupRevenuePage() {
    removeButtonEvents();
};