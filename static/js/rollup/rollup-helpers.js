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
    var rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++){
        // get all the right values
        var avg_salary = rows[i].querySelector('.salary').getAttribute('value');
        var baseline_ftes_cell = rows[i].querySelector('.ftes-baseline');
        var baseline_ftes = baseline_ftes_cell.getAttribute('value');
        var supp_ftes_cell = rows[i].querySelector('.ftes-supp');
        var supp_ftes = supp_ftes_cell.getAttribute('value');
        // calcuate #FTEs x average salary + COLA adjustments + merit adjustments + fringe
        total_baseline_cost = baseline_ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
        total_supp_cost = supp_ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
        // update counters
        personnel_baseline += total_baseline_cost;
        personnel_supp += total_supp_cost;
        // update in table
        rows[i].querySelector('.total-baseline').textContent = formatCurrency(total_baseline_cost);
        rows[i].querySelector('.total-supp').textContent = formatCurrency(total_supp_cost);
        // update colors if relevant
        if (baseline_ftes > 0){
            baseline_ftes_cell.classList.add("keep");
        } 
        // else if ('keep' in baseline_ftes_cell.classList){
        //     baseline_ftes_cell.classList.remove('keep');
        //     console.log(baseline_ftes_cell.classList);
        // }
        if (supp_ftes > 0){
            supp_ftes_cell.classList.add("supp");
        } 
        // else if ('keep' in supp_ftes_cell.classList){
        //     supp_ftes_cell.classList.remove('keep');
        // }

    }
    updateDisplay();
}
