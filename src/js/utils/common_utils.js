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
    str = str.replaceAll('  ', ' ');
    str = str.replace(/^\s+|\s+$/g, '');
    return str;
}

export function colSum(table, colName) {
    // fill with zero until there is something saved in storage
    if(!table || table == ''){ 
        return 0; 
    }
    const headers = Object.keys(table[0]);
    if (headers.includes(colName)) {
        let sum = 0;
        for (let i = 0; i < table.length; i++){
            var value = Math.round(parseFloat(table[i][colName]));
            // treat NaN (non-numerics) as zeroes
            if (value) { sum += value; }
        }
        return sum;
    } else {
        // console.error(`Could not find expected total column in saved data for ${name}. Returning 0. See StoredTable.totalCol() switch.`);
        return 0;
    }

}

export function getUniqueValues(data, key) {
    const values = data.map(obj => obj[key]);
    return Array.from(new Set(values));
}
