// Helper function
function filterData(filterClass, selectedOption){
    // Get all rows in the table
    const rows = document.querySelectorAll('#main-table tbody tr');

    console.log('here');


    // Iterate through each row
    rows.forEach(row => {
        // Find the cell with the specified class
        const cell = row.querySelector(`.${filterClass}`);
        
        if (cell) {
            // Check if the cell's text content matches the selected option
            if (selectedOption === "" || cell.textContent.trim() === selectedOption) {
                row.classList.remove('hidden'); // Show the row
            } else {
                row.classList.add('hidden'); // Hide the row
            }
        }
    });
};

const Filter = {
    html(filterLabel, filterClass) {
        // basic html with only 'All' option
        return `<label for="filter-${filterClass}">Filter by ${filterLabel}:</label>
                <select id="filter-${filterClass}" class="filter-dropdown">
                    <option value="">All</option>
                </select>`
    },

    addOption(filterClass, option) {
        // Add another option to the dropdown for the filter
        const filterObj = document.querySelector(`#filter-${filterClass}`);
        const optionObj = document.createElement('option');
        optionObj.value = option;
        optionObj.textContent = option;
        filterObj.appendChild(optionObj);
    },

    add(filterLabel, filterClass) {
        // create a div to contain the html and insert inside filter-container
        const filterContainer = document.querySelector('#filter-container');
        const filterDiv = document.createElement('div');
        filterDiv.innerHTML = this.html(filterLabel, filterClass);
        filterContainer.appendChild(filterDiv);
        // add all relevant options from that column in the table
        this.addAllOptions(filterClass);
        // Bind change event to the select element
        document.querySelector(`#filter-${filterClass}`).addEventListener('change', function() {
            const selectedOption = this.value;
            if(this.value != 'All'){
                filterData(filterClass, selectedOption);
            }
        });
    },

    addAllOptions(filterClass) {
        // get matching column from table
        const column = document.querySelectorAll(`#main-table td.${filterClass}`);

        // Use a Set to store unique values in the column of interest
        const uniqueValues = new Set();
        
        // Iterate over the NodeList to get the unique values
        column.forEach(td => {
            // Add each textContent to the Set
            uniqueValues.add(td.textContent.trim());
        });
        // add all values as options to the filter dropdown
        uniqueValues.forEach(option => {
            this.addOption(filterClass, option);
        });
    },

    deleteAll(){
        document.querySelector('#filter-container').innerHTML = '';
    }
}

export default Filter;