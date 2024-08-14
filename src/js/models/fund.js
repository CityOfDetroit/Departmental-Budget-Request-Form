
import { colSum } from "../utils/common_utils";
import { TOTAL_COLUMNS } from '../constants/';

// Class to hold information on a specific fund and table
class StoredTable {
    constructor(page, fund){
        this.name = `${page}_${fund}`;
        this.page = page;
        this.table = JSON.parse(localStorage.getItem(this.name));
    }

    totalCol() {
        return TOTAL_COLUMNS[this.page];
    }
    getSum() {
        // fill with zero until there is something saved in storage
        return colSum(this.table, this.totalCol(), this.name);
    }

}

// Holds all the detailed data for one fund's budget
export class Fund {
    constructor(fund){
        this.fund = fund;
        this.personnel = new StoredTable('personnel', fund);
        this.overtime = new StoredTable('overtime', fund);
        this.nonpersonnel = new StoredTable('nonpersonnel', fund);
        this.revenue = new StoredTable('revenue', fund);
    }

    getPersonnelCost() {
        return this.personnel.getSum() + this.overtime.getSum();
    }

    getNonPersonnelCost() {
        return this.nonpersonnel.getSum();
    }

    getRevenue() {
        return this.revenue.getSum();
    }

    getTotal() { 
        return this.getNonPersonnelCost() + this.getPersonnelCost() //- this.getRevenue() 
    }
}

export default Fund;