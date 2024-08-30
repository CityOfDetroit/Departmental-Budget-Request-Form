
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
    }
}

export default Filter;