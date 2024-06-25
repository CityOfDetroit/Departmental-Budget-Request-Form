import { formatCurrency } from "../../utils/utils.js";

export function addTableHeaders(table_id, header_array){

    // Get the table element by its ID
    const table = document.getElementById(table_id);
    
    // Create a table header row element
    const headerRow = document.createElement('tr');
    
    for (const headerText of header_array) {

        // Create a header cell element
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        
        // Append the header cell to the header row
        headerRow.appendChild(headerCell);
    }
    
    // Append the header row to the table header
    let thead = table.querySelector('thead');
    thead.appendChild(headerRow);
}

export function addNewRow(table_id, data_dictionary){
    // Get the table element by its ID
    const table = document.getElementById(table_id);

    // check if header has already been added
    let header_row = table.querySelector('thead tr');
    if (!header_row) {
        addTableHeaders(table_id, Object.keys(data_dictionary));
    }

    // add row of data
    const new_row = document.createElement('tr');
    const cell_data_array = Object.values(data_dictionary);

    for (const cell_data of cell_data_array) {
        // Create new cell and add it to the row
        const newCell = document.createElement('td');
        newCell.textContent = cell_data;
        new_row.appendChild(newCell);
    }

    // Append the new row to the table body
    let tbody = table.querySelector('tbody');
    tbody.appendChild(new_row);

}

export function adjustTableWidth(table_id, width_pct){
    const table = document.getElementById(table_id);
    table.style.width = width_pct;
}

export function clearTable(table_id){
    const table = document.getElementById(table_id);
    table.querySelector('thead').innerHTML = '';
    table.querySelector('tbody').
    innerHTML = '';
}

// Add button functions
export function hideAddButton(){
    document.getElementById('add-btn').style.display = 'none';
}

export function showAddButton(){
    document.getElementById('add-btn').style.display = 'block';
}

export function updateAddButtonText(text){
    document.getElementById('add-btn').textContent = text;
}

// Show and hide table

export function hideTable(table_id){
    const table = document.getElementById(table_id);
    table.style.display = 'none';
    hideAddButton();
}

export function showTable(table_id){
    const table = document.getElementById(table_id);
    table.style.display = 'table';
}

// position is index at which new column will be inserted
export function addCol(tableId, position, htmlContent = '', headerTitle = '') {
    // Get the table element by its ID
    let table = document.getElementById(tableId);
    
    if (!table) {
      console.error(`Table with ID ${tableId} not found.`);
      return;
    }
  
    // Validate position
    let maxPosition = table.rows[0].cells.length;
    if (position < 0 || position > maxPosition) {
      console.error(`Position ${position} is out of bounds.`);
      return;
    }
  
    // Insert the header if provided
    let thead = table.tHead;
    if (headerTitle && thead) {
      let th = document.createElement('th');
      th.innerHTML = headerTitle; // Use innerHTML to insert HTML content
      thead.rows[0].insertBefore(th, thead.rows[0].cells[position]);
    }
  
    // Insert new cells into each row of the table body
    let tbody = table.tBodies[0];
    if (tbody) {
      for (let i = 0; i < tbody.rows.length; i++) {
        let row = tbody.rows[i];
        let td = document.createElement('td');
        td.innerHTML = htmlContent; // Use innerHTML to insert HTML content
        row.insertBefore(td, row.cells[position]);
      }
    }
}

function ncols(tableId){
    const table = document.getElementById(tableId);
    // Ensure that the row exists before counting the columns
    return table.rows[0].cells.length;
}
  
export function addColToEnd(tableId, htmlContents = [], headerTitle = ''){
    // count columns and add new column to the end
    const position = ncols(tableId);
    addCol(tableId, position, htmlContents, headerTitle);
}

export let confirm_btn = '<button class="btn btn-confirm">Confirm</button>';
export let  edit_btn = '<button class="btn btn-edit">Edit</button>';

// functions for editing rows
function editButton() {
    return edit_btn + confirm_btn;
};

export function addEditCol(tableId){
    addColToEnd(tableId, editButton(), ' ');
}

export function assignClassToColumn(tableId, headerName, className) {
    // Get the table element by its ID
    let table = document.getElementById(tableId);

    // Find the index of the column by its header name
    const thead = table.tHead;
    if (!thead || thead.rows.length === 0) {
        console.error('The table header is not found or has no rows.');
        return;
    }
    
    let headerCellIndex = -1;
    const headerCells = thead.rows[0].cells; // Assuming the first row contains header cells (<th>)
    for (let i = 0; i < headerCells.length; i++) {
        if (headerCells[i].textContent.trim() === headerName) {
            headerCellIndex = i;
            break;
        }
    }

    if (headerCellIndex === -1) {
        console.error(`No header found with name "${headerName}"`);
        return;
    }
  
    // Assign the class to each cell in the specified column index within the tbody
    let tbody = table.tBodies[0];
    if (tbody) {
      let bodyRows = tbody.rows;
      for (let row of bodyRows) {
        if (row.cells[headerCellIndex]) {
          row.cells[headerCellIndex].classList.add(className);
        }
      }
    }
  }

export function AddCostClass(tableId, headerName){
    assignClassToColumn(tableId, headerName, 'cost');

    // Get all the cells with the specified class name
    const cells = document.querySelectorAll(`.cost`);
      
    cells.forEach(cell => {
        // Get the current text content of the cell and assign it to 'value' attribute
        if (!cell.getAttribute('value')){
            const cellValue = cell.textContent.trim();
            cell.setAttribute('value', cellValue);

            // Now format the text content like currency and replace it in the cell
            const formattedCurrency = formatCurrency(parseFloat(cellValue));
            cell.textContent = formattedCurrency;
        }
      
    });

}

export function getCellValue(row, className){
    var cellValue = row.querySelector(`.${className}`).getAttribute('value');
    return parseFloat(cellValue);
}

export function updateTableCell(row, col_class, new_value){
    const cell = row.querySelector(`.${col_class}`);
    cell.setAttribute('value', new_value);
    cell.textContent = formatCurrency(new_value);
}