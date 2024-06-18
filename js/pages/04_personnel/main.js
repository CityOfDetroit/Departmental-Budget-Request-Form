
import { updatePageState } from "../../utils/storage-handlers.js";

//helpers
import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { hidePromptButtons, showPrompt, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { AddCostClass, addCol, addColToEnd, addEditCol, adjustTableWidth, assignClassToColumn, showTable } from "../../components/table/table.js";
import { showSideBar } from "../../components/sidebar/sidebar.js";

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

            // create confirm button
            // (elsewhere, attach confirmation listener to turn off edit class and show edits)
        });
    };
}


function createEditableCell(cellClass, attribute = 'value'){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // Fetch the current attribute value of the cell or fall back to an empty string
    var currentValue = cell.getAttribute(attribute) || '';
    // Create an input element to edit the value
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = currentValue;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(textbox);
    //cell.appendChild(feedback);
}

function commitAndRestoreText() {
    // Retrieve the entered value
    var enteredValue = textbox.value;
    // Set the attribute to the entered value
    cell.setAttribute(attribute, enteredValue);
    
    // validate text against validation criteria
    let feedback_text = '';
    if (validate){
        feedback_text = validate(enteredValue);
    }

    // if there's an error, show it
    if (feedback_text){
        feedback.textContent = feedback_text;
    // otherwise, proceed
    } else {
        // Format and set the cell's text content
        cell.textContent = formatValueCallback ? formatValueCallback(enteredValue) : enteredValue;
        // If there is an update callback provided, call it
        if (updateCallback) {
            updateCallback();
        }
    };
}