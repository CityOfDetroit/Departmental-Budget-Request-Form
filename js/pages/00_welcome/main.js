
import { updatePageState } from '../../utils/storage-handlers.js'
import { initializePageView, addLinks } from './helpers.js'

export function initializeWelcomePage(){

    updatePageState('welcome');
    initializePageView();
    addLinks();

}