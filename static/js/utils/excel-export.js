// Download data button
function downloadTableAsExcel(tableId, filename) {
    var table = document.getElementById(tableId);
    var workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, filename + '.xlsx');
}