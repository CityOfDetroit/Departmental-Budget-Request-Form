/**
 * Saves employee table data and budget counters in local storage.
 */
function saveTableData() {
    var table = document.getElementById("employee-table");
    var rows = table.rows;
    var tableData = [];

    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].cells;
        var rowData = [];
        for (var j = 0; j < cols.length; j++) {
            // for the action buttons, save the chosen action, not the button text
            if (cols[j].querySelector('button')) {
                rowData.push(rows[i].className);
            } else {
                rowData.push(cols[j].innerText);
            }
        }
        tableData.push(rowData);
    }

    // Save JSON string to localStorage
    localStorage.setItem("employeeTableData", JSON.stringify(tableData));
    // also save counters in sidebar
    localStorage.setItem('personnel_baseline', personnel_baseline.toString());
    localStorage.setItem('personnel_supp', personnel_supp.toString());
}

/**
 * Loads employee table data and budget counters from local storage.
 * 
 */
function loadTableData() {
        var data = localStorage.getItem("employeeTableData");
        if (data) {
            var tableData = JSON.parse(data);
            var table = document.getElementById("employee-table");
    
            // It's good practice to empty the existing table first
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
    
            // Now, add the loaded rows to the table
            for (var i = 1; i < tableData.length; i++) {
                var newRow = table.insertRow(-1);
                var ncols = tableData[i].length;
                for (var j = 0; j < ncols-1; j++) {
                    var newCell = newRow.insertCell(j);
                    newCell.innerText = tableData[i][j];
                }
                // Add the action buttons and load saved class
                
                var lastCell = newRow.insertCell(ncols-1);
                lastCell.innerHTML = `
                <div class="action-btns">
                    <button class="btn btn-delete">DELETE</button>
                    <button class="btn btn-supplemental">SUPPLEMENTAL</button>
                    <button class="btn btn-carryover">KEEP IN FY26</button>
                </div>
                `;
                newRow.classList.add(tableData[i][ncols-1]);
            }

            //retrieve counter values
            personnel_baseline = parseInt(localStorage.getItem('personnel_baseline'), 10);
            personnel_supp = parseInt(localStorage.getItem('personnel_supp'), 10);
            updateDisplay();
        }
}
