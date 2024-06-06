document.addEventListener('DOMContentLoaded', function () {

    
    // Welcome screen -----------------------------------------------------------

    // Start over with new data (to be replaced with Excel upload)
    document.getElementById('start-over-btn').addEventListener('click', function(event){
        showTable('position-page', 'welcome-page');
    })
    // Load last saved session
    document.getElementById('load-saved-data-btn').addEventListener('click', function(event){
        loadTableData();
        showTable('position-page', 'welcome-page');
    });

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