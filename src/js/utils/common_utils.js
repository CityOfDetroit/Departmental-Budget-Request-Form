// Function to format number as currency
export const formatCurrency = (amount, return_zero = false) => {
    var amount = Math.round(parseFloat(amount));
    if (amount == NaN){
        return "$ -"
    }
    if (amount < 0){
        return '($' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ')';
    } else if (amount == 0) {
        if (return_zero){
            return '$0';    
        }
        return "$ -"
    }
    return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} ;

// function to convert formatted number to a float
export const unformatCurrency = (formattedAmount) => {
    if (!formattedAmount) { return 0 };
    // Remove any currency symbols and commas
    let numericalPart = formattedAmount.replace(/[^0-9.-]+/g, "");
    if (numericalPart == '-'){
        return 0;
    }
    return parseFloat(numericalPart);
};

export function displayWithCommas(value) {
    if (value == 0){
        return 0;
    }
    return formatCurrency(value).replace('$', '');
}

export function cleanString(str){
    return str.toLowerCase().replaceAll(' ', '-');
}

export function removeNewLines(str){
    // replace all new lines with spaces
    str = str.replaceAll(/[\r\n]+/g, " ");
    // remove any extra spaces or trailing/leading whitespace
    str = str.replaceAll('  ', ' ');
    str = str.replace(/^\s+|\s+$/g, '');
    return str;
}