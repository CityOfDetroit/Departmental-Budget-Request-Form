// Function to format number as currency
const formatCurrency = (amount) => {
    var amount = parseFloat(amount);
    if (amount == NaN){
        return "$ -"
    }
    if (amount < 0){
        return '($' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')';
    } else if (amount == 0) {
        return "$ -"
    }
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} ;

// function to convert formatted number to a float
const unformatCurrency = (formattedAmount) => {
    // Remove any currency symbols and commas
    let numericalPart = formattedAmount.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericalPart);
};


// Function to update the display of the current and supp variables
function updateDisplay() {
    // document.getElementById('target').textContent = formatCurrency(target);
    // update and format sidebar values from variables
    document.getElementById('personnel-baseline').textContent = formatCurrency(personnel_baseline);
    document.getElementById('personnel-supp').textContent = formatCurrency(personnel_supp);
    document.getElementById('nonpersonnel-baseline').textContent = formatCurrency(nonpersonnel_baseline);
    document.getElementById('nonpersonnel-supp').textContent = formatCurrency(nonpersonnel_supp);
    // update bottom lines
    supp_total = -supp_revenue + personnel_supp + nonpersonnel_supp;
    baseline_total = -baseline_revenue + personnel_baseline +  nonpersonnel_baseline;
    document.getElementById('baseline-total').textContent = formatCurrency(baseline_total);
    document.getElementById('supp-total').textContent = formatCurrency(supp_total);
    if(baseline_total <= target){
        document.getElementById('baseline-total').style.color = "green";
    }
    if(baseline_total > target){
        document.getElementById('baseline-total').style.color = "red";
    }
}

/**
 * Transforms a specified cell into an editable element by attaching an input field.
 * Once the editing is committed, the new value is saved in the specified attribute
 * of the element and passed through an optional formatting function before being
 * displayed in the cell. An optional callback can be triggered after the update
 * to perform additional actions.
 *
 * @param {HTMLElement} cell - The DOM element representing the cell to be made editable.
 * @param {string} attribute - The attribute name of the cell where the value will be stored.
 * @param {function} [formatValueCallback] - Optional. A function to format the value
 *        before displaying it in the cell. The function must accept a string and return
 *        a formatted string.
 * @param {function} [updateCallback] - Optional. A function to be called after the cell
 *        value has been updated. Use this to trigger any additional side effects or updates
 *        to related data or UI elements.
 * @param {function} [validate] - Optional. A function to validate input and return an error 
 *        message if relevant.
 */
function createEditableCell(cell, attribute = 'value', formatValueCallback, updateCallback, validate) {
    // Add a click event to the cell to make it editable
    cell.onclick = function() {
        // Fetch the current attribute value of the cell or fall back to an empty string
        var currentValue = cell.getAttribute(attribute) || '';
        // Create an input element to edit the value
        var textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.value = currentValue;
        var feedback = document.createElement('p');
        feedback.style.color = "red";

        // Function to commit the textbox value and restore static text
        function commitAndRestoreText() {
            // Retrieve the entered value
            var enteredValue = textbox.value;
            // Set the attribute to the entered value
            cell.setAttribute(attribute, enteredValue);
            
            // validate text against validation criteria
            let feedback_text = '';
            if (validate){
                feedback_text = validate(enteredValue);
            }

            // if there's an error, show it
            if (feedback_text){
                feedback.textContent = feedback_text;
            // otherwise, proceed
            } else {
                // Format and set the cell's text content
                cell.textContent = formatValueCallback ? formatValueCallback(enteredValue) : enteredValue;
                // If there is an update callback provided, call it
                if (updateCallback) {
                    updateCallback();
                }
            };

            // Reattach the onclick event to allow editing again in the future
            cell.onclick = function() {
                createEditableCell(cell, attribute, formatValueCallback, updateCallback, validate);
            };
        }

        // When the textbox loses focus, commit its value
        textbox.onblur = commitAndRestoreText;
        // When the user presses the 'Enter' key, commit the value and blur the textbox
        textbox.onkeydown = function(event) {
            if (event.key === 'Enter') {
                commitAndRestoreText();
                textbox.blur();
            }
        };

        // Clear the current content and append the textbox to the cell
        cell.innerHTML = '';
        cell.appendChild(textbox);
        cell.appendChild(feedback);
        // Temporarily remove the onclick event handler to prevent re-triggering during edit
        cell.onclick = null;
        
        // Focus on the textbox to start editing
        textbox.focus();
    }
}

// Function to apply createEditableCell to all cells matching a given selector
function applyEditableCells(selector, attribute = 'value', formatValueCallback, updateCallback, validate) {
    // Select all elements that match the provided selector
    var cells = document.querySelectorAll(selector);
    // Iterate over each cell and make it editable
    cells.forEach(function(cell) {
        createEditableCell(cell, attribute, formatValueCallback, updateCallback, validate);
    });
}

function validateNumber(input){
    var number = parseFloat(input);
    if (isNaN(number)){
        return "Field only accepts numbers";
    };
    return "";
}