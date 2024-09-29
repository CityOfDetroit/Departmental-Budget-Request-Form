import Header from "./headers.js";
import { formatCurrency } from "../../../utils/common_utils.js";

async function addNewRow(data_dictionary, columns = []){
    
    // Get the table element by its ID
    const table = document.getElementById('main-table');

    // check if header has already been added
    let header_row = table.querySelector('thead tr');
    if (!header_row) {
        Header.add(columns);
        header_row = table.querySelector('thead tr');
    }

    // initialize new row of data
    const new_row = document.createElement('tr');

    // go through each header and add the right cell value depending on its class
    let thElements = header_row.querySelectorAll('th');
    thElements.forEach( (header_cell) => {
        // Create new cell and add it to the row
        const newCell = document.createElement('td');
        new_row.appendChild(newCell);
        // if the data has an appropriate class, add the info to the cell. 
        // Otherwise, keep empty cell
        Object.keys(data_dictionary).forEach( (className) => {
            if (header_cell.classList.contains(className) ){
                newCell.textContent = data_dictionary[className];
                newCell.classList.add(className);
            }
        });
    });

    // Append the new row to the top of the table body
    let tbody = table.querySelector('tbody');
    if (tbody.firstChild) {
        tbody.insertBefore(new_row, tbody.firstChild);
    } else {
        tbody.appendChild(new_row);
    }
}

function saveRowEdits(row){
    var cells = row.querySelectorAll('td')
    cells.forEach( cell => {
        // save dropdown values
        if (cell.querySelector('select')){
            var serviceSelector = cell.querySelector('select');
            cell.textContent = serviceSelector.value;
        } else if (cell.querySelector('input')) {
            // save new entered value in textbox
            var textbox = cell.querySelector('input');
            var enteredValue = textbox.value;
            // update display and format with currency if relevant
            if ( cell.classList.contains('cost') ){
                // if cost, remove commas first
                enteredValue = enteredValue.replaceAll(',', '');
                cell.textContent = formatCurrency(enteredValue);
                // set value attribute to the new user input
                cell.setAttribute('value', enteredValue);
            } else {
                cell.textContent = enteredValue;
            }
        } else if (cell.querySelector('textarea')){
            // save new entered value in textbox
            var enteredValue = cell.querySelector('textarea').value;
            cell.textContent = enteredValue;
        }
    })
}

function markNewRow(){
    // Get the table element by its ID and fetch first row
    let first_row = document.querySelector('#main-table tbody').firstChild;
    // get the right color from the root() defined in common.css
    const rootStyle = getComputedStyle(document.documentElement);
    const palegreen = rootStyle.getPropertyValue('--palegreen').trim();
    // make first row (with new row) green
    first_row.style.backgroundColor = palegreen;
    // Fade back to default after 0.75 seconds
    setTimeout(() => {
        first_row.style.backgroundColor = '';
    }, 750);
}

const Rows = {
    add : function(data_dictionary, cols){
        addNewRow(data_dictionary, cols);
    },
    saveEdits : function(row){
        saveRowEdits(row);
    },
    markNewRow : markNewRow
}

export default Rows;