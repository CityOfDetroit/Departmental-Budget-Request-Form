import { updatePageState } from '../../utils/data_utils/local_storage_handlers.js'
import { preparePageView, removeButtonEvents, setUpNavButtons, updateSidebar } from './helpers.js'

export function loadRevenuePage() {

    //update page state
    updatePageState('revenue');
    preparePageView();
    setUpNavButtons();
}

export function cleanupRevenuePage() {
    removeButtonEvents();
    updateSidebar();
};