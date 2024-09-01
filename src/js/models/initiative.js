
// data structure to hold information on new initiatives

export class Initiative {
    
    constructor(row) {
        this.data = row;
        this.name = row['Initiative Name'];
    }

    expenses() { 
        if (this.data['Ballpark Total Expenses']) {
            return this.data['Ballpark Total Expenses'];
        } else {
            return 0;
        }
    }

    revenue() { 
        if (this.data['Revenue']) {
            return this.data['Revenue'];
        } else {
            return 0;
        }
    }

    net() { return this.expenses() }

}

export default Initiative;