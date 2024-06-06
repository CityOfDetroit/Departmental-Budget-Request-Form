document.addEventListener('DOMContentLoaded', function () {

    // Load last saved session
    document.getElementById('start-over-btn').addEventListener('click', function(event){
        localStorage.setItem("employeeTableData", "");
    });

});