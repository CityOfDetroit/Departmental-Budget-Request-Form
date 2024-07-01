import { fetchJSON } from "../../../utils/data_utils/JSON_data_handlers.js";

async function loadJSONIntoTable(jsonFilePath) {
    const data = await fetchJSON(jsonFilePath);
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
            console.error('The provided JSON file does not contain an array of objects.');
        }
    } catch(error) {
        console.error('Failed to load and parse the JSON file:', error);
    }
}

export const Data = {
    loadFromJSON : loadJSONIntoTable
}

export default Data;