// Function to format number as currency
export const formatCurrency = (amount, return_zero = false) => {
    var amount = parseFloat(amount);
    if (amount == NaN){
        return "$ -"
    }
    if (amount < 0){
        return '($' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ')';
    } else if (amount == 0) {
        if (return_zero){
            return '$0';    
        }
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function pauseExecution(seconds) {
    await delay(seconds * 1000); // convert to milliseconds
}