
import { updatePageState } from "../../utils/storage-handlers.js";

//helpers
import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { AddCostClass, addCol, addColToEnd, addEditCol, adjustTableWidth, assignClassToColumn, showTable } from "../../components/table/table.js";
import { incrementSidebarStat, showSideBar } from "../../components/sidebar/sidebar.js";
import { formatCurrency } from "../../utils/utils.js";

// variables on the salary 
var fringe = 0.36
var cola = 0.02
var merit = 0.02

export function loadPersonnelPage(){

    //update page state
    updatePageState('personnel');

    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    showSideBar();
    hidePromptButtons();
    adjustTableWidth('main-table', '90%');

    // update page text
    updateSubtitle('Personnel');
    updatePrompt('For each job in your department, select the service and request the number of baseline and supplemental FTEs.');
    
    initializePersonnelTable();

}

export function initializePersonnelTable(){
    // Initialize table
    //loadJSONIntoTable('../../../../budget-request-demo/data/law_dept_sample/personnel_data.json', 'main-table')
    loadJSONIntoTable('../../../data/law_dept_sample/personnel_data.json', 'main-table')
        .then(() => {
            showTable('main-table');
            addCol('main-table', 3, '', 'Service');
            addColToEnd('main-table', '0', 'Total Cost (Baseline)');
            addColToEnd('main-table', '0', 'Total Cost (Supplementary)');
            addEditCol('main-table');
            // assign cost classes
            assignClassToColumn('main-table', 'Current Average Salary', 'avg-salary');
            AddCostClass('main-table', 'Current Average Salary');
            assignClassToColumn('main-table', 'Total Cost (Baseline)', 'total-baseline');
            AddCostClass('main-table', 'Total Cost (Baseline)');
            assignClassToColumn('main-table', 'Total Cost (Supplementary)', 'total-supp');
            AddCostClass('main-table', 'Total Cost (Supplementary)');
            // assign other classes
            assignClassToColumn('main-table', 'Job Name', 'job-name');
            assignClassToColumn('main-table', 'Baseline FTEs', 'baseline-ftes');
            assignClassToColumn('main-table', 'Supplemental FTEs', 'supp-ftes');
            // manage edit buttons
            handleRowEdit();
        })
        .catch(error => {
            console.error('An error occurred during table initialization:', error);
        }); 
}

export function handleRowEdit(){
    // attach an event listener to each edit button in every row
    var editButtons = document.getElementsByClassName('btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function(event) {
            // Determine what was clicked on within the table
            var rowToEdit = event.target.closest('tr');
            // mark row as being edited
            rowToEdit.classList.add('active-editing');
            
            // turn relevant entries into textboxes
            createEditableCell('baseline-ftes');
            createEditableCell('supp-ftes');
            // make acount string and service editable

            // hide edit buttons
            var editButtons = document.getElementsByClassName('btn-edit');
            for (var i = 0; i < editButtons.length; i++) {
                editButtons[i].style.display = 'none';
            }
            
            initializeConfirmButton(rowToEdit);
        });
    };
}


function createEditableCell(cellClass, attribute = 'value'){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // Create an input element to edit the value
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = cell.textContent;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(textbox);
    //cell.appendChild(feedback);
}


function initializeConfirmButton(rowToEdit){
    // get element and add listener for click
    const confirm_btn = rowToEdit.querySelector(".btn-confirm");
    // show confirm button
    confirm_btn.style.display = 'block';
    confirm_btn.addEventListener('click', function(event){
        // get current row
        const rowToEdit = event.target.closest('tr');
        var textboxes = rowToEdit.querySelectorAll('input')
        // save all text in textboxes
        textboxes.forEach( textbox => {
            var enteredValue = textbox.value;
            var cell = textbox.parentElement;
            cell.textContent = enteredValue;
        })

        // update values in sidebar
        updateDisplayandTotals();

        // make row no longer green
        rowToEdit.classList.remove('active-editing');

        // show edit buttons
        var editButtons = document.getElementsByClassName('btn-edit');
        for (var i = 0; i < editButtons.length; i++) {
            editButtons[i].style.display = 'block';
        }
         
        // hide confirm button
        confirm_btn.style.display = 'none';
    });
}

function getCellValue(row, className){
    return row.querySelector(`.${className}`).getAttribute('value');
}

function calculateTotalCost(ftes, avg_salary, fringe, cola, merit){
    return ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
}

export function updateTableCell(row, col_class, new_value){
    const cell = row.querySelector(`.${col_class}`);
    cell.setAttribute(new_value, 'value');
    cell.textContent(formatCurrency(value));
}

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // get row
    const row = document.querySelector('.active-editing');
    // fetch values for calculations
    let avg_salary = getCellValue(row, 'avg-salary');
    let baseline_ftes = getCellValue(row, 'baseline-ftes')
    let supp_ftes = getCellValue(row, 'supp-ftes');

    // calcuate #FTEs x average salary + COLA adjustments + merit adjustments + fringe
    let total_baseline_cost = calculateTotalCost(baseline_ftes, avg_salary, fringe, cola, merit);
    let total_supp_cost = calculateTotalCost(supp_ftes, avg_salary, fringe, cola, merit);
       
    // update counters
    incrementSidebarStat('baseline-personnel', total_baseline_cost);
    incrementSidebarStat('supp-personnel', total_supp_cost);

    // update totals in table
    updateTableCell(row, 'total-baseline', total_baseline_cost);
    updateTableCell(row, 'total-supp', total_supp_cost);
}
