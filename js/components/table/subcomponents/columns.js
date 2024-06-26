import { formatCurrency } from "../../../utils/utils.js";

// position is index at which new column will be inserted
function addCol(position, htmlContent = '', headerTitle = '') {
    // Get the table element by its ID
    let table = document.getElementById('main-table');

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

function ncols(){
    const table = document.getElementById('main-table');
    // Ensure that the row exists before counting the columns
    return table.rows[0].cells.length;
}
  
function addColToEnd(htmlContents = [], headerTitle = ''){
    // count columns and add new column to the end
    const position = ncols('main-table');
    addCol(tableId, position, htmlContents, headerTitle);
}

function assignClassToColumn(headerName, className) {
    // Get the table element by its ID
    let table = document.getElementById('main-table');

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

function addCostClass(headerName){
    assignClassToColumn('main-table', headerName, 'cost');

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


const Column = {
    add: addCol(position, htmlContent, headerTitle),
    addAtEnd : addColToEnd(htmlContent, headerTitle),
    assignClass : assignClassToColumn(headerName, className),
    addCostClass : addCostClass(headerName),
};

export default Column;