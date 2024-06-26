import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import Table from '../../components/table/table.js'
import Sidebar from "../../components/sidebar/sidebar.js";
import { DATA_ROOT, fringe, cola, merit } from "../../init.js"
import { createDropdownFromJSON } from "../../components/form/form.js";


export function preparePageView(){
    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    showSidebar();
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
    Table.Display.show();
    Table.Columns.add(3, '', 'Service');
    Table.Columns.addAtEnd('0', 'Total Cost (Baseline)');
    Table.Columns.addAtEnd( '0', 'Total Cost (Supplementary)');
    Table.Columns.addAtEnd(Table.Buttons.Edit.html + Table.Buttons.Confirm.html, ' ');
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
            createSelectCell('service');

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

async function createSelectCell(cellClass){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // add service dropdown
    const serviceDropdown = await createDropdownFromJSON(DATA_ROOT + 'services.json');
    serviceDropdown.value = cell.textContent;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(serviceDropdown);
}            

function initializeConfirmButton(rowToEdit){
    // get element and add listener for click
    const confirm_btn = rowToEdit.querySelector(".btn-confirm");
    // show confirm button
    confirm_btn.style.display = 'block';
    confirm_btn.addEventListener('click', function(event){
        // get current row
        const rowToEdit = event.target.closest('tr');

        // set service selection
        const serviceSelector = rowToEdit.querySelector('select');
        if (serviceSelector){
            var cell = serviceSelector.closest('td');
            cell.textContent = serviceSelector.value;
        }

        var textboxes = rowToEdit.querySelectorAll('input');
        // save all text in textboxes
        textboxes.forEach( textbox => {
            var enteredValue = textbox.value;
            var cell = textbox.parentElement;
            cell.textContent = enteredValue;
            cell.setAttribute('value', enteredValue);
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


function calculateTotalCost(ftes, avg_salary, fringe, cola, merit){
    return ftes * avg_salary * (1 + fringe) * (1 + cola) * (1 + merit);
}

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // initialize
    Sidebar.updateStat('baseline-personnel', 0);
    Sidebar.updateStat('supp-personnel', 0);
    // calculate for each row
    let rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++){
        // fetch values for calculations
        let avg_salary = Table.Cell.getValue(rows[i], 'avg-salary');
        let baseline_ftes = Table.Cell.getValue(rows[i], 'baseline-ftes');
        let supp_ftes = Table.Cell.getValue(rows[i], 'supp-ftes');

        // calcuate #FTEs x average salary + COLA adjustments + merit adjustments + fringe
        let total_baseline_cost = calculateTotalCost(baseline_ftes, avg_salary, fringe, cola, merit);
        let total_supp_cost = calculateTotalCost(supp_ftes, avg_salary, fringe, cola, merit);
        
        // update counters
        Sidebar.incrementStat('baseline-personnel', total_baseline_cost);
        Sidebar.incrementStat('supp-personnel', total_supp_cost);

        // update totals in table
        Table.Cell.updateValue(rows[i], 'total-baseline', total_baseline_cost);
        Table.Cell.updateValue(rows[i], 'total-supp', total_supp_cost);
    }
}
