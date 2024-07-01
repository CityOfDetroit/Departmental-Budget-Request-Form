import { hideWelcomeButtons } from '../../components/welcome/welcome.js'
import { hideModal, removeModalLink } from '../modal/modal.js';
import NavButtons from '../nav_buttons/nav_buttons.js';
import Prompt from '../prompt/prompt.js';
import Sidebar from '../sidebar/sidebar.js';
import Table from '../table/table.js';


function clearAll() {
    // hide everything in the body
    hideWelcomeButtons();
    hideModal();
    NavButtons.hide();
    Prompt.hide();
    Table.hide();
    Sidebar.hide();

    // todo: fix this function to remove id in modal folder
    removeModalLink('option1', 'main-modal');
}

export const Body = {
    clearAll : clearAll
}

export default Body;