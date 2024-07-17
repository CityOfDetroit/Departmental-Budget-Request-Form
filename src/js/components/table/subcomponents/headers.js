function addTableHeaders(header_array){

    // Get the table element by its ID
    const table = document.getElementById('main-table');
    
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

const Header = {
    add: function(header_array){
        addTableHeaders(header_array)
    }
};

export default Header;