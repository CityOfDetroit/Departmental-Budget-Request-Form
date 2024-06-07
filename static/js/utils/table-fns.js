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
        <div class="action-btns">
            <button class="btn btn-delete">DELETE</button>
            <button class="btn btn-supplemental">SUPPLEMENTAL</button>
            <button class="btn btn-carryover">KEEP IN FY26</button>
        </div>
            `;
}