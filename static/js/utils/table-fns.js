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
function addTextboxCell(cell) {
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.placeholder = isSalaryCell ? 'Enter salary' : 'Type value';
    textbox.style.width = "100%"; // Modified the width to fit the cell
    cell.appendChild(textbox); // Add the textbox to the cell
}

// Add editable cell for cost data
function addCostCell(cell){
    cell.classList.add('cost'); // Ensure the cell has a 'salary' class
    enableEditingForSalaryCell(cell); // Make the cell editable on click
    textbox.onblur = function() {
        var enteredValue = textbox.value;
        cell.setAttribute('cost', enteredValue);
        updateDisplay();
    }
}

function addRow() {
    let table_id = "employee-table"
    var table = document.getElementById(table_id);
    var newRow = table.insertRow(-1);
    // var newNameCell = newRow.insertCell(0);
    // count number of table columns using jQuery
    let key = "#" + table_id + " tr th";
    let cols = $(key).length; 
    for (let i = 0; i < cols-2; i++) {
        var nextCell = newRow.insertCell(i);
        addTextboxCell(nextCell);
    }

    // Cost cell will always be second to last
    var costCell = newRow.insertCell(cols-2);
    addCostCell(costCell);

    // Last cell is the action cell with 3 buttons
    var actionCell = newRow.insertCell(cols-1);
    actionCell.innerHTML = `
        <div class="action-btns">
            <button class="btn btn-delete">DELETE</button>
            <button class="btn btn-supplemental">SUPPLEMENTAL</button>
            <button class="btn btn-carryover">KEEP IN FY26</button>
        </div>
            `;
}