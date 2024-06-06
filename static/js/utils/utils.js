// Function to format number as currency
const formatCurrency = (amount) => {
    var amount = parseFloat(amount);
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} ;

// unhide table
function showTable(show_id, hide_id=null) {
    var positionPage = document.getElementById(show_id);
    positionPage.style.display = 'block';  
    if (hide_id){
        document.getElementById(hide_id).style.display = "none";
    }
}

// Function to update the display of the current and supp variables
function updateDisplay() {
    document.getElementById('current').textContent = formatCurrency(current);
    document.getElementById('supps').textContent = formatCurrency(supp);
    if(current <= target){
        document.getElementById('current').style.color = "green";
    }
    if(current > target){
        document.getElementById('current').style.color = "red";
    }
}