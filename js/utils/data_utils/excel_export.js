// Download data button
function downloadTableAsExcel(table_name_in_storage, sheet_name, filename = "Detail_sheet") {

    var data = localStorage.getItem(table_name_in_storage);
    if (data) {
        const workbook = XLSX.utils.book_new();
        var tableData = JSON.parse(data);
        var worksheet = XLSX.utils.json_to_sheet(tableData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
        XLSX.writeFile(workbook, filename + '.xlsx');
    }
}