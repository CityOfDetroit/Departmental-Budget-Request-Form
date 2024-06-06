document.addEventListener('DOMContentLoaded', function () {

    // Load from last local storage
    loadTableData();

    // Add new row to the position table
    document.querySelector('.btn-add').addEventListener('click', addRow);

    // Event listener for the action buttons
    document.getElementById('employee-table').addEventListener('click', handleActionClick);

    // Add an event listener for the save button
    document.getElementById('save').addEventListener('click',saveTableData);

    // Add an event listener for the download button
    document.getElementById('XLSX-download').addEventListener('click', function() {
        downloadTableAsExcel('employee-table', 'table-export');
    });

});