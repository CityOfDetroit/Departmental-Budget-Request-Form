function addNewRow(data_dictionary){
    // Get the table element by its ID
    const table = document.getElementById('main-table');

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

const Rows = {
    add : addNewRow(data_dictionary)
}

export default Rows;