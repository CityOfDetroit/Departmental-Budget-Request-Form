
import { CurrentPage } from '../../utils/data_utils/local_storage_handlers.js'
import { initializePageView, addLinks } from './helpers.js'

export function initializeWelcomePage(){

    CurrentPage.update('welcome');
    initializePageView();
    addLinks();

}