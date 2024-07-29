import './table.css';

import Buttons from './subcomponents/buttons.js'
import Cell from './subcomponents/cells.js'
import Columns from './subcomponents/columns.js'
import Header from './subcomponents/headers.js'
import Rows from './subcomponents/rows.js'
import Data from './subcomponents/data.js'
import Tooltip from '../tooltip/tooltip.js';
import { convertToJSON } from "../../utils/data_utils/JSON_data_handlers.js";
import Sidebar from '../sidebar/sidebar.js';
import CurrentFund from '../../models/current_fund.js';
import CurrentPage from '../../models/current_page.js';

function adjustTableWidth(width_pct){
    const table = document.getElementById('main-table');
    table.style.width = width_pct;
}

function clearTable(){
    const table = document.getElementById('main-table');
    table.querySelector('thead').innerHTML = '';
    table.querySelector('tbody').innerHTML = '';
}

function showTable(){
    const table = document.getElementById('main-table');
    table.style.display = 'table';
}

function hideTable(){
    const table = document.getElementById('main-table');
    table.style.display = 'none';
    Buttons.AddRow.hide();
}

function saveTableData() {
    // remove the detail text
    Tooltip.unlink();
    // get table
    var table = document.getElementById('main-table');
    // determine save_as name
    if (CurrentFund.number()) {
        var save_as = `${CurrentPage.load()}_${CurrentFund.number()}`;
    } else {
        var save_as = CurrentPage.load();
    }
    localStorage.setItem(save_as, convertToJSON(table, ['Edit']));
    // update sidebar with new data
    Sidebar.updateTotals();
    // relink, depending on page
    Tooltip.linkAll();
}

const Table = {
    Buttons : Buttons,
    Cell : Cell,
    Columns : Columns,
    Header : Header,
    Rows : Rows,
    Data : Data,
    // functions
    adjustWidth : function(width_pct){
        adjustTableWidth(width_pct)
    },
    clear : clearTable,
    hide : hideTable,
    show : showTable,
    save : saveTableData
}

export default Table;