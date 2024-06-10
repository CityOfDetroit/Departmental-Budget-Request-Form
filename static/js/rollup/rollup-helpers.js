function updateAccountString(dropdown_id, string_class){
    var dropdown = document.getElementById(dropdown_id);
    var account_num = dropdown.options[dropdown.selectedIndex].value;
    // find correct string to update
    var rowToEdit = document.getElementById('editing');
    var account_span = rowToEdit.getElementsByClassName(string_class)[0];
    account_span.textContent = account_num;
}

function handleAccountEdit(event) {
    // Determine what was clicked on within the table
    var rowToEdit = event.target.closest('tr');
    // mark row as being edited
    rowToEdit.id = 'editing';
}

function exitAccountEditModal() {
    // remove marker that row is being actively edited
    document.getElementById('editing').removeAttribute('id');
}