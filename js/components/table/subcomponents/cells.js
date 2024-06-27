import { formatCurrency } from "../../../utils/utils.js";

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

const Cell = {
    getValue: function(row, className) {
        return getCellValue(row, className); 
    },
    updateValue: function(row, col_class, new_value) {
        updateTableCell(row, col_class, new_value); 
    }
};

export default Cell;