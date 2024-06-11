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

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // reset to sum all
    personnel_baseline = 0;
    personnel_supp = 0;
    // calculate for each row
    let rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++){
        // get all the right values
        let avg_salary = rows[i].querySelector('.salary').getAttribute('value');
        let baseline_ftes_cell = rows[i].querySelector('.ftes-baseline');
        let baseline_ftes = baseline_ftes_cell.getAttribute('value');
        let supp_ftes_cell = rows[i].querySelector('.ftes-supp');
        let supp_ftes = supp_ftes_cell.getAttribute('value');
        // calcuate #FTEs x average salary + COLA adjustments + merit adjustments + fringe
        total_baseline_cost = baseline_ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
        total_supp_cost = supp_ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
       
        // update counters
        personnel_baseline += total_baseline_cost;
        personnel_supp += total_supp_cost;

        // update totals in table
        rows[i].querySelector('.calculated-total-supp').textContent = formatCurrency(total_supp_cost);
        rows[i].querySelector('.calculated-total-baseline').textContent = formatCurrency(total_baseline_cost);
        
        // actions if there is an update
        if ((baseline_ftes + supp_ftes) > 0){
            // make ? icon visible 
            let buttons = rows[i].querySelectorAll('.icon-button.btn-see-calcs');
            buttons.forEach(function(button) {
                button.style.display = "block";
            });
                // update colors if relevant
            if (baseline_ftes > 0){
                baseline_ftes_cell.classList.add("keep");
            } 
            if (supp_ftes > 0){
                supp_ftes_cell.classList.add("supp");
            } 
        }
    }
    updateDisplay();
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
        window.location.href = "nonpersonnel.html";
    } else {
        showServiceErrors();
    }
}