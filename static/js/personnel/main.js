document.addEventListener('DOMContentLoaded', function () {

    // Load from last local storage
    loadTableData("employeeTableData");
    loadCounters();

    // Add new row to the position table
    document.querySelector('.btn-add').addEventListener('click', addRow);

    // Event listener for the action buttons
    document.getElementById('employee-table').addEventListener('click', handleActionClick);

    // Add an event listener for the save button
    // document.getElementById('save').addEventListener('click', function() {
    //     saveTableData("employee-table", 'employeeTableData');
    // });

    // Add an event listener for the download button
    document.getElementById('XLSX-download').addEventListener('click', function() {
        saveTableData('employee-table', 'employeeTableData');
        downloadTableAsExcel('employeeTableData', 'Personnel', 'table-export');
    });

});