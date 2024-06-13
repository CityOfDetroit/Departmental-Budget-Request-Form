
// Manage clicks in the action area of the personnel table
function handleActionClick(event) {
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
        const salary = parseInt(event.target.closest('tr').querySelector('.cost').getAttribute('value'));
        if (rowClass == "keep"){
            personnel_baseline -= salary;
        } else if (rowClass == "supp"){
            personnel_supp -= salary;
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
        const salary = parseInt(event.target.closest('tr').querySelector('.cost').getAttribute('value'));
        if (rowClass == "keep"){
            personnel_baseline -= salary
        };
        if (rowClass != "supp"){
            personnel_supp += salary;
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
        const salary = parseInt(event.target.closest('tr').querySelector('.cost').getAttribute('value'));
        if (rowClass == "supp"){
            personnel_supp -= salary;
        } ;
        if (rowClass != "keep"){
            personnel_baseline += salary;
        } ;           
        updateDisplay();
    }
}

// Add row for personnel table
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
        createEditableCell(nextCell, 'value');
    }

    // Cost cell will always be second to last
    var costCell = newRow.insertCell(cols-2);
    createEditableCell(costCell, 'value', formatCurrency, updateDisplay, validateNumber);
    costCell.classList.add('cost')

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