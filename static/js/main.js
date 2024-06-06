import { saveTableData, loadTableData } from './storage-handlers.js';

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

    // Add an event listener for the save button
    document.getElementById('save').addEventListener('click', () => saveTableData(current, supp));

    // Use button to show table
    document.getElementById('start-over-btn').addEventListener('click', showTable);
    document.getElementById('load-saved-data-btn').addEventListener('click', function(event){
        loadTableData(updateDisplay, formatCurrency);
        showTable();
    });

    // unhide table
    function showTable() {
        var positionPage = document.getElementById('position-page');
        positionPage.style.display = 'block';  
        document.getElementById('welcome-page').style.display = "none";
    }
    
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
        newRow.classList.add("no-choice-yet");
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