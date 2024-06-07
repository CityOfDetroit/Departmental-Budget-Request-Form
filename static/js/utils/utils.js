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

// function to convert formatted number to a float
const unformatCurrency = (formattedAmount) => {
    // Remove any currency symbols and commas
    let numericalPart = formattedAmount.replace(/[^0-9.-]+/g, "");
    return parseFloat(numericalPart);
};


// Function to update the display of the current and supp variables
function updateDisplay() {
    // document.getElementById('target').textContent = formatCurrency(target);
    // update current and supp 
    // TODO rename these
    document.getElementById('personnel-baseline').textContent = formatCurrency(personnel_baseline);
    document.getElementById('personnel-supp').textContent = formatCurrency(personnel_supp);
    // update bottom lines
    supp_total = -supp_revenue + personnel_supp;
    baseline_total = -baseline_revenue + personnel_baseline;
    document.getElementById('baseline-total').textContent = formatCurrency(baseline_total);
    document.getElementById('supp-total').textContent = formatCurrency(supp_total);
    if(baseline_total <= target){
        document.getElementById('baseline-total').style.color = "green";
    }
    if(baseline_total > target){
        document.getElementById('baseline-total').style.color = "red";
    }
}