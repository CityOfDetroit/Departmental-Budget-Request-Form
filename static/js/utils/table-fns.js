// Function to turn the cell back into a textbox when clicked
function enableEditingForSalaryCell(cell) {
    cell.onclick = function() {
        var currentValue = cell.getAttribute('cost') || '';
        var textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.value = currentValue;

        function commitAndRestoreText() {
            var enteredValue = textbox.value;
            cell.setAttribute('cost', enteredValue);
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
    textbox.placeholder = 'Type value';
    //textbox.style.width = "100%"; // Modified the width to fit the cell
    cell.appendChild(textbox); // Add the textbox to the cell
}

// Add editable cell for cost data
function addCostCell(cell){
    cell.classList.add('cost'); // Ensure the cell has a 'cost' class
    enableEditingForSalaryCell(cell); // Make the cell editable on click
    // textbox.onblur = function() {
    //     var enteredValue = textbox.value;
    //     cell.setAttribute('cost', enteredValue);
    //     updateDisplay();
    // }
}