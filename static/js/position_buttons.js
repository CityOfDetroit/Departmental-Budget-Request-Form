document.addEventListener('DOMContentLoaded', function () {

    // running tallies of total spend
    let supp = 0;
    let current = 0;
    let target = 240000;

    // Function to format number as currency
    const formatCurrency = (amount) => {
        var amount = parseFloat(amount);
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } ;

    // function to save employee data in localStorage (client web cache)
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
        localStorage.setItem('current', current.toString());
        localStorage.setItem('supp', supp.toString());
    }

    // Add an event listener for the download button
    document.getElementById('save').addEventListener('click',saveTableData);

    // Function to load saved data
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

    // unhide table
    function showTable() {
        var positionPage = document.getElementById('position-page');
        positionPage.style.display = 'block';  
        document.getElementById('welcome-page').style.display = "none";
    }

    // Use button to show table
    document.getElementById('start-over-btn').addEventListener('click', showTable);
    document.getElementById('load-saved-data-btn').addEventListener('click', function(event){
        loadTableData();
        showTable();
    });
    
    // Function to update the display of the current and supp variables
    function updateDisplay() {
        document.getElementById('current').textContent = formatCurrency(current);
        document.getElementById('supps').textContent = formatCurrency(supp);
        if(current <= target){
            document.getElementById('current').style.color = "green";
        }
        if(current > target){
            document.getElementById('current').style.color = "red";
        }
    }

    // Function to turn the cell back into a textbox when clicked
    function enableEditingForSalaryCell(cell) {
        cell.onclick = function() {
            var currentValue = cell.getAttribute('data-salary') || '';
            var textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.value = currentValue;

            function commitAndRestoreText() {
                var enteredValue = textbox.value;
                cell.setAttribute('data-salary', enteredValue);
                cell.textContent = formatCurrency(parseFloat(enteredValue));
                updateDisplay();

                // Attach the click event to revert back to textbox upon future clicks
                cell.onclick = function() {
                    enableEditingForSalaryCell(cell);
                };
            }

            textbox.onblur = commitAndRestoreText;
            textbox.onkeydown = function(event) {
                if (event.key === 'Enter') {
                    commitAndRestoreText(); // Commit the value and restore the cell text
                    textbox.blur(); // Unfocus the textbox to trigger the blur event
                }
            };

            cell.innerHTML = ''; // Clear cell content
            cell.appendChild(textbox); // Embed textbox
            cell.onclick = null; // Remove click listener so it doesn't interfere while editing
            
            textbox.focus();
        }
    }

    // The modified addTextboxCell function
    function addTextboxCell(cell, isSalaryCell = false) {
        var textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.placeholder = isSalaryCell ? 'Enter salary' : 'Type value';
        textbox.style.width = "100%"; // Modified the width to fit the cell
        cell.appendChild(textbox); // Add the textbox to the cell

        if (isSalaryCell) {
            cell.classList.add('salary'); // Ensure the cell has a 'salary' class
            enableEditingForSalaryCell(cell); // Make the cell editable on click
            textbox.onblur = function() {
                var enteredValue = textbox.value;
                cell.setAttribute('data-salary', enteredValue);
                updateDisplay();
            }
        }
    }

    var addPositionButton = document.querySelector('.btn-add');
    function addRow() {
        var table = document.getElementById("employee-table");
        var newRow = table.insertRow(-1);
        // var newNameCell = newRow.insertCell(0);
        // count number of table columns using jQuery
        let cols = $("#employee-table tr th").length; 
        for (let i = 0; i < cols-1; i++) {
            var nextCell = newRow.insertCell(i);
            if (i === 2) { // Check if it's the third cell
                // Pass true so that the function knows this is a salary cell
                addTextboxCell(nextCell, true);
            } else {
                addTextboxCell(nextCell);
            };
        }
        var lastCell = newRow.insertCell(cols-1);
        lastCell.innerHTML = `
            <button class="btn btn-delete">DELETE</button>
            <button class="btn btn-supplemental">MAKE SUPPLEMENTAL</button>
            <button class="btn btn-carryover">KEEP IN FY26</button>
        `;
    }
    addPositionButton.addEventListener('click', addRow)

    document.getElementById('employee-table').addEventListener('click', function(event) {
        // Determine what was clicked on within the table
        var clickedElement = event.target;
        
        // Check if a delete button was clicked
        if (clickedElement.matches('.btn-delete')) {
            var currentRow = clickedElement.closest('tr');
            // get current class and update it
            var rowClass = currentRow.className;
            if (rowClass) {
                currentRow.classList.remove(rowClass);
            }
            currentRow.classList.add("delete");
            // update variable counters
            const salary = parseInt(event.target.closest('tr').querySelector('.salary').getAttribute('data-salary'));
            if (rowClass == "keep"){
                current -= salary
            } else if (rowClass == "supp"){
                supp -= salary;
            };
            updateDisplay();
        }
        // Check if a supplemental button was clicked
        else if (clickedElement.matches('.btn-supplemental')) {
            var currentRow = clickedElement.closest('tr');
            // get current class and update it
            var rowClass = currentRow.className;
            if (rowClass) {
                currentRow.classList.remove(rowClass);
            }
            currentRow.classList.add("supp");
            // change counters
            const salary = parseInt(event.target.closest('tr').querySelector('.salary').getAttribute('data-salary'));
            if (rowClass == "keep"){
                current -= salary
            };
            if (rowClass != "supp"){
                supp += salary;
            };
            updateDisplay();
        }
        // Check if a carryover button was clicked
        else if (clickedElement.matches('.btn-carryover')) {
            var currentRow = clickedElement.closest('tr');
            // get current class and update it
            var rowClass = currentRow.className;
            if (rowClass) {
                currentRow.classList.remove(rowClass);
            }
            currentRow.classList.add("keep");
            // update counter
            const salary = parseInt(event.target.closest('tr').querySelector('.salary').getAttribute('data-salary'));
            if (rowClass == "supp"){
                supp -= salary;
            } ;
            if (rowClass != "keep"){
                current += salary;
            } ;           
            updateDisplay();
        }
    });

    // Download data button
    function downloadTableAsExcel(tableId, filename) {
        var table = document.getElementById(tableId);
        var workbook = XLSX.utils.table_to_book(table);
        XLSX.writeFile(workbook, filename + '.xlsx');
    }
    // Add an event listener for the download button
    document.getElementById('XLSX-download').addEventListener('click', function() {
        downloadTableAsExcel('employee-table', 'table-export');
    });

});