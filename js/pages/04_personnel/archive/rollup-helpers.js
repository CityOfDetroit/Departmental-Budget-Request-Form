// variables on the salary 
fringe = 0.36
cola = 0.02
merit = 0.02


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
    var job_name = rowToEdit.cells[0].textContent;
    document.getElementById('job-name').textContent = job_name;
}

function exitAccountEditModal() {
    // remove marker that row is being actively edited
    document.getElementById('editing').removeAttribute('id');
}


// check if all service boxes are filled
function validateServiceSelections(){
    let service_dropdowns = document.querySelectorAll(".service")
    let validated = true;
    service_dropdowns.forEach(function(dropdown) {
        if (!dropdown.value || dropdown.value.trim() === "") {
            // Found a dropdown with an empty value, return false
            validated = false;
          }
    });
    // All dropdowns have a non-empty value
    return validated;
}

function showServiceErrors(){
    let service_dropdowns = document.querySelectorAll(".service")
    service_dropdowns.forEach(function(dropdown) {

        const cell = dropdown.parentElement;
    
        // Clear any previous error message 
        const existingErrorMessage = cell.querySelector('.error-message');
        if (existingErrorMessage) {
            cell.removeChild(existingErrorMessage);
        }

        if (!dropdown.value || dropdown.value.trim() === "") {
            // Create a new span element for the error message
            const errorMessage = document.createElement('span');
            errorMessage.textContent = "This field is required"; 
            errorMessage.classList.add('error-message'); 

            // Append the error message span to the cell
            cell.appendChild(errorMessage);            
        }
    });
}

// function to happen on click of continue button
function continueToNonPersonnel(){
    if (validateServiceSelections()){
        saveCounters();
        saveTableData(table_id = "rollup-table", save_as = "rollup_table");
        window.location.href = "05_nonpersonnel.html";
    } else {
        showServiceErrors();
    }
}