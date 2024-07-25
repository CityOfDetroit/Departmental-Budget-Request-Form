import { formatCurrency } from "../../../utils/common_utils.js";

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
    addCol(position, htmlContents, headerTitle);
}

function assignClassToColumn(headerName, className) {
    // Get the table element by its ID
    let table = document.getElementById('main-table');

    // Find the index of the column by its header name
    const thead = table.tHead;
    let headerCellIndex = -1;
    const headerCells = thead.rows[0].cells; // Assuming the first row contains header cells (<th>)
    for (let i = 0; i < headerCells.length; i++) {
        if (headerCells[i].textContent.trim() === headerName) {
            // assign the class to the header cell
            headerCells[i].classList.add(className);
            headerCellIndex = i;
            break;
        }
    }

    // error check
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
    assignClassToColumn( headerName, 'cost');

    // Get all the cells with the specified class name
    const cells = document.querySelectorAll(`.cost`);
      
    cells.forEach(cell => {
        // Get the current text content of the cell and assign it to 'value' attribute
        if (!cell.getAttribute('value')){
            const cellText = cell.textContent.trim();
            const cellValue = isNaN(cellText) || cellText === '' ? 0 : parseFloat(cellText);
            cell.setAttribute('value', cellValue);

            // Now format the text content like currency and replace it in the cell
            const formattedCurrency = formatCurrency(parseFloat(cellValue));
            cell.textContent = formattedCurrency;
        }
      
    });

}

function assignColumnClasses(columnDefinitions) {
    columnDefinitions.forEach(column => {
        // Assign class to column
        assignClassToColumn(column.title, column.className);

        // If the column is a cost column, add the specific cost class
        if (column.isCost) {
            addCostClass(column.title);
        }

        // show the column
        if (!column.hide){
            showColumnByTitle(column.title);
        }
    });
}

function hideColumn(index) {
  var table = document.getElementById('main-table');
  var rows = table.rows;

  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].cells;
      if (cells.length > index) {
          cells[index].style.display = 'none';
      }
  }
}

// Function to show a specific column
function showColumn(index) {
  var table = document.getElementById('main-table');
  var rows = table.rows;

  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].cells;
      if (cells.length > index) {
          cells[index].style.display = 'table-cell';
      }
  }
}

// Function to get the column index by title
function getColumnIndexByTitle(table, title) {
  var headers = table.querySelectorAll('th');
  for (var i = 0; i < headers.length; i++) {
      if (headers[i].innerText === title) {
          return i;
      }
  }
  return -1; // Column not found
}

// Function to hide a column by title
function hideColumnByTitle(title) {
  var table = document.getElementById('main-table');
  var index = getColumnIndexByTitle(table, title);
  if (index !== -1) {
      hideColumn(index);
  } else {
      console.log(`Column with title "${title}" not found.`);
  }
}

// Function to show a column by title
function showColumnByTitle(title) {
  var table = document.getElementById('main-table');
  var index = getColumnIndexByTitle(table, title);
  if (index !== -1) {
      showColumn(index);
  } else {
      console.log(`Column with title "${title}" not found.`);
  }
}


const Column = {
  add: function(position, htmlContent, headerTitle) {
      return addCol(position, htmlContent, headerTitle);
  },
  addAtEnd: function(htmlContent, headerTitle) {
      return addColToEnd(htmlContent, headerTitle);
  },
  assignClasses: function(column_definitions) {
      return assignColumnClasses(column_definitions);
  },
  hide : function(colName) {
      hideColumnByTitle(colName);
  },
  show : function(colName) {
      showColumnByTitle(colName);
  }
};

export default Column;