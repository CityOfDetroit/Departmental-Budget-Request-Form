import { updatePageState } from "../../utils/storage-handlers.js";

// helpers
import { hideWelcomeButtons } from "../../components/welcome/welcome.js";
import { showPrompt, hidePromptButtons, updatePrompt } from "../../components/prompt/prompt.js";
import { showNavButtons } from "../../components/nav_buttons/nav_buttons.js";
import { showSideBar, incrementSidebarStat } from "../../components/sidebar/sidebar.js";
import { AddCostClass, addColToEnd, confirm_btn, edit_btn, adjustTableWidth, assignClassToColumn, showTable, getCellValue } from "../../components/table/table.js";
import { updateSubtitle } from "../../components/header/header.js";
import { loadJSONIntoTable } from "../../utils/data-handlers.js";
import { DATA_ROOT } from "../../init.js";
import { formatCurrency } from "../../utils/utils.js";

export function loadNonpersonnelPage(){

    updatePageState('nonpersonnel');
    // prepare page view
    hideWelcomeButtons();
    showPrompt();
    showNavButtons();
    showSideBar();
    hidePromptButtons();
    adjustTableWidth('main-table', '100%');

    // update page text
    updateSubtitle('Non-Personnel');
    updatePrompt('Select an action item for each non-personnel line item from last year.');

    initializeNonpersonnelTable()
}

var action_btn_html = `
        <span class="action-btns">
            <button class="btn btn-delete">DELETE</button>
            <button class="btn btn-supplemental">SUPPLEMENTAL</button>
            <button class="btn btn-carryover">RETAIN</button>
        </span>
        ${edit_btn}
        ${confirm_btn}
            `;

export async function initializeNonpersonnelTable(){
    // load table data from json
    await loadJSONIntoTable(DATA_ROOT + 'nonpersonnel_data.json', 'main-table');
    //after table is loaded, fill it
    showTable('main-table');
    addColToEnd('main-table', action_btn_html, "Select Action");
    // assign cost classes
    assignClassToColumn('main-table', 'Request Total', 'request');
    AddCostClass('main-table', 'Request Total');
    // assignClassToColumn('main-table', 'Total Cost (Baseline)', 'total-baseline');
    // AddCostClass('main-table', 'Total Cost (Baseline)');
    // assignClassToColumn('main-table', 'Total Cost (Supplementary)', 'total-supp');
    // AddCostClass('main-table', 'Total Cost (Supplementary)');
    // // assign other classes
    // assignClassToColumn('main-table', 'Job Name', 'job-name');
    // assignClassToColumn('main-table', 'Baseline FTEs', 'baseline-ftes');
    // assignClassToColumn('main-table', 'Supplemental FTEs', 'supp-ftes');
    // assignClassToColumn('main-table', 'Service', 'service');
    // manage edit buttons
    handleRowEdit(['request']);
}

export function handleRowEdit(editable_col_classes){
    // attach an event listener to each edit button in every row
    var editButtons = document.getElementsByClassName('btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', async function(event) {
            // Determine what was clicked on within the table
            var rowToEdit = event.target.closest('tr');
            // mark row as being edited
            rowToEdit.classList.add('active-editing');
            
            // turn relevant entries into textboxes
            for (let i = 0; i < editable_col_classes.length; i++){
                createEditableCell(editable_col_classes[i])
            }
        
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
    if (cell.classList.contains('cost')){
        textbox.value = cell.getAttribute('value');
    } else {
        textbox.value = cell.textContent;
    }
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
            var cell = textbox.closest('td');
            cell.setAttribute('value', enteredValue);
            if (cell.classList.contains('cost')){
                cell.textContent = formatCurrency(enteredValue);
            } else {
                cell.textContent = enteredValue;
            }
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

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // get row
    const row = document.querySelector('.active-editing');
    console.log(row);
    // fetch values for calculations
    let request = getCellValue(row, 'request');
    
    // update counters
    incrementSidebarStat('baseline-nonpersonnel', request);
    // incrementSidebarStat('supp-personnel', total_supp_cost);

}
