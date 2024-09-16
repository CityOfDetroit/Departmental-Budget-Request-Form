
import Initiative from "./initiative.js";
import { colSum } from "../utils/common_utils.js";
import { TOTAL_COLUMNS } from "../constants/excel_constants.js";

// data structure to hold supplemental requests
export class Supplemental {
    constructor() {
        this.table = JSON.parse(localStorage.getItem('new-inits'));
        this.initiatives = [];
        if(this.table){
            this.table.forEach((row) => { 
                this.initiatives.push(new Initiative(row));
            });
        }
    }

    getInits() {
        return this.table.map((item) => { return item['Supplemental Initiative'] });
    }

    personnel() {
        return colSum(this.table, 'Personnel Salary & Benefits');
    }

    operating() {
        return colSum(this.table, 'Non-Personnel Operating');
    }

    capital() {
        return colSum(this.table,'Non-Personnel Capital');
    }

    revenue() {
        return colSum(this.table, 'Revenue');
    }

    total(){
        return colSum(this.table, TOTAL_COLUMNS['new-inits']);
    }

}

export default Supplemental;