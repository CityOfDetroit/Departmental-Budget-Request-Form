
import Initiative from "./initiative.js";

// data structure to hold supplemental requests
export class Supplemental {
    constructor() {
        this.table = loadTableData('new-inits');
        this.initiatives = [];
        if(this.table){
            this.table.forEach((row) => { 
                this.initiatives.push(new Initiative(row));
            });
        }
    }

    getInits() {
        return this.table.map((item) => { return item['Initiative Name'] });
    }

    expenses() {
        return colSum(this.table, 'Ballpark Total Expenses');
    }

    revenue() {
        return colSum(this.table, 'Revenue');
    }

    total(){
        return this.expenses() - this.revenue();
    }

}

export default Supplemental;