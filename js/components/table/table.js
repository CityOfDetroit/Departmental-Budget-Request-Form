
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
    table.querySelector('tbody').innerHTML = '';
}

export function hideTable(table_id){
    const table = document.getElementById(table_id);
    table.style.display = 'none';
}

export function showTable(table_id){
    const table = document.getElementById(table_id);
    table.style.display = 'table';
}