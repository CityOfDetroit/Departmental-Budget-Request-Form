import { formatCurrency } from "../../../utils/utils.js";
import Dropdown from "../../form/subcomponents/dropdown.js";

// return cell value attribute or 0 if it does not exist
function getCellValue(row, className) {
    var cell = row.querySelector(`.${className}`);
    var cellValue = cell ? cell.getAttribute('value') : null;
    return cellValue ? parseFloat(cellValue) : 0;
}

function updateTableCell(row, col_class, new_value){
    const cell = row.querySelector(`.${col_class}`);
    cell.setAttribute('value', new_value);
    cell.textContent = formatCurrency(new_value);
}

function createEditableCell(cellClass){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // Create an input element to edit the value
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.value = cell.textContent;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(textbox);
}

async function createSelectCell(cellClass, json_filepath){
    // get cell
    const cell = document.querySelector(`.active-editing td.${cellClass}`);
    // add service dropdown
    const serviceDropdown = await Dropdown.createFromJSON(json_filepath);
    serviceDropdown.value = cell.textContent;
    // Clear the current content and append the textbox to the cell
    cell.innerHTML = '';
    cell.appendChild(serviceDropdown);
}

const Cell = {
    getValue: function(row, className) {
        return getCellValue(row, className); 
    },
    updateValue: function(row, col_class, new_value) {
        updateTableCell(row, col_class, new_value); 
    },
    createTextbox : function(className) {
        createEditableCell(className)
    },
    createDropdown : function(className, json_filepath){
        createSelectCell(className, json_filepath);
    },
};

export default Cell;