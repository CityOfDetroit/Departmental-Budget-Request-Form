import './table.css';

import Buttons from './subcomponents/buttons.js'
import Cell from './subcomponents/cells.js'
import Columns from './subcomponents/columns.js'
import Header from './subcomponents/headers.js'
import Rows from './subcomponents/rows.js'
import Data from './subcomponents/data.js'
import Tooltip from '../tooltip/tooltip.js';
import { convertToJSON } from "../../utils/JSON_data_handlers.js";
import Sidebar from '../sidebar/sidebar.js';
import CurrentFund from '../../models/current_fund.js';
import CurrentPage from '../../models/current_page.js';

function adjustTableWidth(width_pct){
    const table = document.getElementById('main-table');
    table.style.width = width_pct;
}

// function clearTable(){
//     const table = document.getElementById('main-table');
//     table.querySelector('thead').innerHTML = '';
//     table.querySelector('tbody').innerHTML = '';
// }

function showTable(){
    const tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = Table.html;
    const table = document.getElementById('main-table');
    table.style.display = 'table';
}

function hideTable(){

    // delete table object from table container
    const tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = '';

    //  TODO: change to explicitly delete and re-create table
    // $(document).ready(function() {
    //     console.log("Checking if DataTable is initialized...");
    //     if ($.fn.DataTable.isDataTable('#main-table')) {
    //         console.log("DataTable is initialized. Destroying...");
    //         var table = $('#main-table').DataTable();
    //         table.destroy();  // destroy the DataTable instance
    //         $('#main-table').empty(); // Clear the table contents before reinitializing
    //     } else {
    //         console.log("DataTable is not initialized.");
    //     }
    
    //     // Reinitialize the DataTable
    //     console.log("Reinitializing DataTable...");
    //     $('#main-table').DataTable({
    //         // add your DataTable configuration here
    //     });
    //     console.log("DataTable reinitialized.");
    // });

    //table.hide(); // jQuery's hide method
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
    html : `
        <table class="table table-bordered mt-3 display" id="main-table">
            <thead class="thead-dark"></thead>
            <tbody></tbody>
        </table>`,
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
    // TODO: delete
    clear : hideTable,
    hide : hideTable,
    show : showTable,
    save : saveTableData
}

export default Table;