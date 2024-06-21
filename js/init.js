// import functions
import { initializeWelcomePage } from './pages/00_welcome/main.js';
import { loadNewInitiatives } from './pages/02_new_initiatives/main.js'
import { loadRevenuePage } from './pages/03_revenue/main.js'
import { loadPageState } from './utils/storage-handlers.js'
import { initializeNavButtons } from './components/nav_buttons/nav_buttons.js';
import { loadPersonnelPage } from './pages/04_personnel/main.js';
import { addTarget } from './components/sidebar/sidebar.js';

// path for my laptop
//export let DATA_ROOT = '../../../data/law_dept_sample/'
// github path
export let DATA_ROOT = '../../budget-request-demo/data/law_dept_sample/'

export let REVENUE = 0;

document.addEventListener('DOMContentLoaded', function () {

    var page_state = loadPageState();
    initializeNavButtons();
    addTarget(2000000);

    switch (page_state){
        case 'welcome':
            initializeWelcomePage();
            break;
        case 'new-inits':
            loadNewInitiatives();
            break;
        case 'revenue':
            loadRevenuePage();
            break;
        case 'personnel':
            loadPersonnelPage();
            break;
    };
    

});