document.addEventListener('DOMContentLoaded', function () {

    // If starting over, reset storage
    document.getElementById('start-over-btn').addEventListener('click', function(event){
        localStorage.setItem("employeeTableData", "");
    });

    // Show start from saved data button only if there is saved data
    if (localStorage.getItem("employeeTableData")) {
        document.getElementById('load-saved-data-btn').style.display = "block"
    }

});