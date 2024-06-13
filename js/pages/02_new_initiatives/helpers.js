// process new initiative submission

// todo: parameterize so that it loads a table based on just the entries from the form

export function handleFormSubmissions(event){
    event.preventDefault(); // Prevent the default form submission

    // get values from form
    var name = document.getElementById('init-name').value;
    var explanation = document.getElementById('init-explanation').value;
    var request = document.getElementById('init-request').value;

    var table = document.getElementById('initiative-table');

    // Insert a row at the end of the table
    var newRow = table.insertRow(table.rows.length);
    
    // Insert cells in the row
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    
    // Add some text to the new cells
    cell1.innerHTML = name;
    cell2.innerHTML = explanation;
    cell3.innerHTML = formatCurrency(request);
    cell3.classList.add('cost');
    
    // Clear the form for the next entries
    document.getElementById('new-init-form').reset();

    //show table
    document.getElementById('initiative-table-div').style.display = "block";

    // hide modal and Y/N questions
    $('#new-init-modal').modal('hide');
    document.getElementById('initial-questions').style.display = 'none';
}