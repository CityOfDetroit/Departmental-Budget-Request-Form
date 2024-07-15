import { FundLookupTable } from "../../../utils/data_utils/budget_data_handlers.js";
import { CurrentFund, CurrentPage, loadTableData, saveTableData } from "../../../utils/data_utils/local_storage_handlers.js";

function fillTable(data) {
    try {
        if(Array.isArray(data)) {
            const table = document.getElementById('main-table');
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');

            // clear existing data
            thead.innerHTML = '';
            tbody.innerHTML = '';
    
            // Create table header row
            const headerRow = document.createElement('tr');
            Object.keys(data[0]).forEach(key => {
              const header = document.createElement('th');
              header.textContent = key;
              headerRow.appendChild(header);
            });
            thead.appendChild(headerRow);
    
            // Create table body rows
            data.forEach(item => {
              const row = document.createElement('tr');
              Object.values(item).forEach(val => {
                const cell = document.createElement('td');
                cell.textContent = val;
                row.appendChild(cell);
              });
              tbody.appendChild(row);
            });
    
        } else {
            console.error('Empty table saved in localStorage.');
        }
    } catch(error) {
        console.error('No table saved in localStorage:', error);
    }
    saveTableData();
}

async function loadFromStorage(){
    // look up table in storage and pass to table load function
    const key = `${CurrentPage.load()}_${CurrentFund.number()}`;
    const data = await loadTableData(key);
    fillTable(data);
}


function loadFunds(){
    // get list of funds from storage
    const fundDict = FundLookupTable.retrieve();
    // build out data in correct format
    const resultArray = [];
    for (const key in fundDict) {
        if (fundDict.hasOwnProperty(key)) {
            resultArray.push({
                Fund: fundDict[key]     // Use the value directly
            });
        }
    }
    fillTable(resultArray);
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


export const Data = {
    load : loadFromStorage,
    loadFunds : loadFunds,
    sort : function(colA, colB) { sort(colA, colB) }
}

export default Data;