document.addEventListener('DOMContentLoaded', function () {

    // // Load from last local storage
    // loadTableData("employeeTableData");

    // // Add an event listener for the save button
    // document.getElementById('save').addEventListener('click', function() {
    //     saveTableData("employeeTableData");
    // });

    // // Add an event listener for the download button
    // document.getElementById('XLSX-download').addEventListener('click', function() {
    //     saveTableData("employee-table");
    //     downloadTableAsExcel('employeeTableData', 'Personnel', 'table-export');
    // });

    // Mark row to be edited on edit button click
    var editButtons = document.getElementsByClassName('btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', handleAccountEdit);
    }    
    // Remove edit marker when finished
    document.getElementById('modal-close-x').addEventListener('click', exitAccountEditModal);
    document.getElementById('modal-done-btn').addEventListener('click', exitAccountEditModal);

    // Update account string based on info in modal dropdowns
    document.getElementById('dropdown-fund').addEventListener("change", function(event){
        updateAccountString('dropdown-fund', 'fund-string');
    });
    document.getElementById('dropdown-approp').addEventListener("change", function(event){
        updateAccountString('dropdown-approp', 'approp-string');
    });
    document.getElementById('dropdown-cc').addEventListener("change", function(event){
        updateAccountString('dropdown-cc', 'cc-string');
    });

});


