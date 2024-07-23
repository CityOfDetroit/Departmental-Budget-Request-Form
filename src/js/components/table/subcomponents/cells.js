import { formatCurrency, displayWithCommas } from "../../../utils/common_utils.js";
import { Services } from "../../../utils/data_utils/budget_data_handlers.js";
import Dropdown from "../../form/subcomponents/dropdown.js";

// return cell value attribute or 0 if it does not exist
function getCellValue(row, className) {
    var cell = row.querySelector(`.${className}`);
    var cellValue = cell ? cell.getAttribute('value') : null;
    return cellValue ? parseFloat(cellValue) : 0;
}

// return text in cell
function getCellText(row, className) {
    var cell = row.querySelector(`.${className}`);
    if (cell) {
        return cell.textContent;
    } else {
        console.log(`Error retrieving cell text for class ${className}`);
        return '';
    }
}

function updateTableCell(row, col_class, new_value){
    const cell = row.querySelector(`.${col_class}`);
    cell.setAttribute('value', new_value);
    cell.textContent = formatCurrency(new_value);
}

function createEditableCell(cellClass, isCost){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // Create an input element to edit the value
    var textbox = document.createElement('input');
    textbox.type = 'text';
    if (isCost){
        var value = cell.getAttribute('value');
    } else {
        var value = cell.textContent;
    }
    textbox.value = displayWithCommas(value);
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(textbox);
}

function createServiceDropdown(){
    // get cell
    var cellClass = 'service';
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // add service dropdown
    const serviceDropdown = Dropdown.create(Services.list());
    serviceDropdown.value = cell.textContent;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(serviceDropdown);
}

const Cell = {
    getValue: function(row, className) {
        return getCellValue(row, className); 
    },
    getText: function(row, className) {
        return getCellText(row, className); 
    },
    updateValue: function(row, col_class, new_value) {
        updateTableCell(row, col_class, new_value); 
    },
    createTextbox : function(className, isCost) {
        createEditableCell(className, isCost)
    },
    createServiceDropdown : createServiceDropdown
};

export default Cell;