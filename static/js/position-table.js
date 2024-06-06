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
}