// function to save employee data in localStorage (client web cache)
function saveTableData(current, supp) {
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
    localStorage.setItem('current', current.toString());
    localStorage.setItem('supp', supp.toString());
}


// Function to load saved data
function loadTableData(updateDisplay, formatCurrency) {
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
                <button class="btn btn-delete">DELETE</button>
                <button class="btn btn-supplemental">MAKE SUPPLEMENTAL</button>
                <button class="btn btn-carryover">KEEP IN FY26</button>
            `;
            newRow.classList.add(tableData[i][ncols-1]);
        }

        //retrieve counter values
        current = parseInt(localStorage.getItem('current'), 10);
        console.log(current);
        supp = parseInt(localStorage.getItem('supp'), 10);
        updateDisplay();
    }
}