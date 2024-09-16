
import Initiative from "./initiative.js";
import { colSum } from "../utils/common_utils.js";
import { NEW_INIT_COLS, TOTAL_COLUMNS } from "../constants/excel_constants.js";

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
        return this.table.map((item) => { return item[NEW_INIT_COLS['name']] });
    }

    personnel() {
        return colSum(this.table, NEW_INIT_COLS['personnel']);
    }

    operating() {
        return colSum(this.table, NEW_INIT_COLS['operating']);
    }

    capital() {
        return colSum(this.table, NEW_INIT_COLS['capital']);
    }

    revenue() {
        return colSum(this.table, NEW_INIT_COLS['revenue']);
    }

    total(){
        return colSum(this.table, TOTAL_COLUMNS['new-inits']);
    }

}

export default Supplemental;