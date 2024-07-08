
import { updatePageState } from '../../utils/data_utils/local_storage_handlers.js'
import { initializePageView, addLinks } from './helpers.js'

export function initializeWelcomePage(){

    updatePageState('welcome');
    initializePageView();
    addLinks();

}