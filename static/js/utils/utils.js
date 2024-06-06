// Function to format number as currency
const formatCurrency = (amount) => {
    var amount = parseFloat(amount);
    if (amount < 0){
        return '($' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')';
    } else if (amount == 0) {
        return "$ -"
    }
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} ;

// Function to update the display of the current and supp variables
function updateDisplay() {
    // document.getElementById('target').textContent = formatCurrency(target);
    // update current and supp 
    // TODO rename these
    document.getElementById('current').textContent = formatCurrency(current);
    document.getElementById('supps').textContent = formatCurrency(supp);
    // update bottom lines
    supp_total = supp_revenue + supp;
    baseline_total = baseline_revenue + current;
    document.getElementById('baseline_total').textContent = formatCurrency(baseline_total);
    document.getElementById('supp_total').textContent = formatCurrency(supp_total);
    if(baseline_total >= target){
        document.getElementById('baseline_total').style.color = "green";
    }
    if(baseline_total < target){
        document.getElementById('baseline_total').style.color = "red";
    }
}