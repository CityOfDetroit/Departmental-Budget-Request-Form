import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { AddCostClass, addCol, addColToEnd, addEditCol, adjustTableWidth, assignClassToColumn, showTable } from "../../components/table/table.js";
import { incrementSidebarStat, showSideBar } from "../../components/sidebar/sidebar.js";
import { formatCurrency } from "../../utils/utils.js";
import { DATA_ROOT, fringe, cola, merit } from "../../init.js"
import { createDropdownFromJSON } from "../../components/form/form.js";

export function preparePageView(){
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
}

export async function initializePersonnelTable(){
    // load table data from json
    await loadJSONIntoTable(DATA_ROOT + 'personnel_data.json', 'main-table');
    //after table is loaded, fill it
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
    assignClassToColumn('main-table', 'Service', 'service');
    // manage edit buttons
    handleRowEdit();
}

export function handleRowEdit(){
    // attach an event listener to each edit button in every row
    var editButtons = document.getElementsByClassName('btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', async function(event) {
            // Determine what was clicked on within the table
            var rowToEdit = event.target.closest('tr');
            // mark row as being edited
            rowToEdit.classList.add('active-editing');
            
            // turn relevant entries into textboxes
            createEditableCell('baseline-ftes');
            createEditableCell('supp-ftes');
            // add service dropdown
            const serviceDropdown = await createDropdownFromJSON(DATA_ROOT + 'services.json');
            rowToEdit.querySelector('.service').innerHTML = serviceDropdown;

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
        var textboxes = rowToEdit.querySelectorAll('input');
        // save all text in textboxes
        textboxes.forEach( textbox => {
            var enteredValue = textbox.value;
            var cell = textbox.parentElement;
            cell.textContent = enteredValue;
            cell.setAttribute('value', enteredValue);
        })
        // set service selection
        const serviceSelector =  rowToEdit.querySelector('select');
        var cell = serviceSelector.parentElement;
        cell.textContent = serviceSelector.value;
        //set service value


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
    var cellValue = row.querySelector(`.${className}`).getAttribute('value');
    return parseFloat(cellValue);
}

function calculateTotalCost(ftes, avg_salary, fringe, cola, merit){
    return ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
}

export function updateTableCell(row, col_class, new_value){
    const cell = row.querySelector(`.${col_class}`);
    cell.setAttribute('value', new_value);
    cell.textContent = formatCurrency(new_value);
}

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // get row
    const row = document.querySelector('.active-editing');
    // fetch values for calculations
    let avg_salary = getCellValue(row, 'avg-salary');
    let baseline_ftes = getCellValue(row, 'baseline-ftes');
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
