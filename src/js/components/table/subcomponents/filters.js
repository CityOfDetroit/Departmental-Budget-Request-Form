// Helper functions & constants

// object to hold all current filter statuses
const filterSettings = {
    'approp-name': '',
    'cc-name': '',
    'object-name': '',
    'object-category': ''
};

// helper function to filter data based on all filters
function filterData() {
    // Get all rows in the table
    const rows = document.querySelectorAll('#main-table tbody tr');
    
    // Iterate through each row and determine if it should be hidden or shown
    rows.forEach(row => {
        let isVisible = true;
        
        // Check each filter setting against the row's cells
        for (const [filterId, filterValue] of Object.entries(filterSettings)) {
            const cell = row.querySelector(`.${filterId}`);

            // only show row if values pass through all filters 
            if (filterValue && cell && (cell.textContent.trim() !== filterValue)) {
                isVisible = false;
                break;
            } 
        }

        // Show or hide the row based on visibility
        row.classList.toggle('hidden', !isVisible);
    });
}

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
        filterDiv.querySelector('.filter-dropdown').addEventListener('change', event => {
            // Update filter settings
            filterSettings[filterClass] = event.target.value;
            // Apply all filters
            filterData();
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
    },

    updateOptions(filterClass) {
        const filterObj = document.querySelector(`#filter-${filterClass}`);
        if (filterObj) {
            // Clear all existing options except for the default 'All' option
            filterObj.options.length = 1;
            // Add new options
            this.addAllOptions(filterClass);
        }
    }
}

export default Filter;