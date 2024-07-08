import Buttons from './subcomponents/buttons.js'
import Cell from './subcomponents/cells.js'
import Columns from './subcomponents/columns.js'
import Header from './subcomponents/headers.js'
import Rows from './subcomponents/rows.js'
import Data from './subcomponents/data.js'
import { unformatCurrency } from '../../utils/common_utils.js'

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

function getColumnIndexByClass(tbody, className) {
    const firstRow = tbody.rows[0];
    if (!firstRow) return -1; // Return -1 if there's no row to examine
    for (let cellIndex = 0; cellIndex < firstRow.cells.length; cellIndex++) {
        if (firstRow.cells[cellIndex].classList.contains(className)) {
            return cellIndex;
        }
    }
    return -1; // Return -1 if class name not found
}

function sort(primaryClass, secondaryClass) {
    const table = document.getElementById('main-table');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    // Get the column indices by class name
    const primaryColIndex = getColumnIndexByClass(tbody, primaryClass);
    const secondaryColIndex = getColumnIndexByClass(tbody, secondaryClass);

    // exit if classes don't exist
    if (primaryColIndex === -1 ) {
        console.error(`Column class ${classA} not found in table`);
        return; 
    } else if (secondaryColIndex === -1) {
        console.error(`Column class ${classB} not found in table`);
        return; 
    }

    // Sort the rows based on the text content of the cells
    rows.sort((rowA, rowB) => {
        // Primary column comparison
        const primaryA = unformatCurrency(rowA.cells[primaryColIndex].textContent);
        const primaryB = unformatCurrency(rowB.cells[primaryColIndex].textContent);

        if (primaryA < primaryB) return -1;
        if (primaryA > primaryB) return 1;

        // Secondary column comparison (if primary is equal)
        const secondaryA = unformatCurrency(rowA.cells[secondaryColIndex].textContent);
        const secondaryB = unformatCurrency(rowB.cells[secondaryColIndex].textContent);

        if (secondaryA < secondaryB) return -1;
        if (secondaryA > secondaryB) return 1;

        // If both columns are equal
        return 0;
    });

    // Reattach sorted rows to the table body
    rows.forEach((row) => tbody.appendChild(row));
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
    sort : function(colA, colB) { sort(colA, colB) }
}

export default Table;