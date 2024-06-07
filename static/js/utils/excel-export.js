// Download data button
function downloadTableAsExcel(filename) {
    // var table = document.getElementById(tableId);
    // var workbook = XLSX.utils.table_to_book(table);
    var data = localStorage.getItem("employeeTableData");
    if (data) {
        var tableData = JSON.parse(data);
        var workbook = XLSX.utils.json_to_book(tableData);
        XLSX.writeFile(workbook, filename + '.xlsx');
    }
}