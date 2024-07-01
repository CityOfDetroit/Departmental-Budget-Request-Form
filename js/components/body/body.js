import Welcome from '../../components/welcome/welcome.js'
import Modal from '../modal/modal.js';
import NavButtons from '../nav_buttons/nav_buttons.js';
import Prompt from '../prompt/prompt.js';
import Sidebar from '../sidebar/sidebar.js';
import Table from '../table/table.js';


function clearAll() {
    // hide everything in the body
    Welcome.hide();
    Modal.clear();
    Modal.hide();
    NavButtons.hide();
    Prompt.hide();
    Table.hide();
    Sidebar.hide();
}

export const Body = {
    clearAll : clearAll
}

export default Body;