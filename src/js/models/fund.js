
import { colSum } from "../utils/common_utils";
import { TOTAL_COLUMNS } from '../constants/';

// Helper function to create a unique list of appropriations represented in a table
function fetchValueSet(table, key) {

    // IF there's no data, return an empty list
    if(!table){
        return [];
    }

    // Use a Set to store unique values
    const uniqValues = new Set();
  
    // Iterate through each object in the table
    table.forEach(row => {
      if (row[key]) {
        uniqValues.add(row[key]);
      }
    });
  
    // Convert the Set to an array if needed
    return uniqValues;
  }

// Class to hold information on a specific fund and table
class StoredTable {
    constructor(page, fund){
        this.name = `${page}_${fund}`;
        this.page = page;
        this.table = JSON.parse(localStorage.getItem(this.name));
        this.approps = fetchValueSet(this.table, 'Appropriation');
        this.cc = fetchValueSet(this.table, 'Cost Center');

    }

    totalCol() {
        return TOTAL_COLUMNS[this.page];
    }
    getSum() {
        // fill with zero until there is something saved in storage
        return colSum(this.table, this.totalCol(), this.name);
    }
    // key is the column to filter on (ie. Cost Center)
    filter(key, value) {
        return this.table.filter(row => row[key] && row[key] === value);
    }

}

export class CostCenter{
    constructor(AppropObj, cc){
        this.personnel = AppropObj.personnel.filter('Cost Center', cc);
        this.nonpersonnel = AppropObj.personnel.filter('Cost Center', cc);
        this.overtime = AppropObj.overtime.filter('Cost Center', cc);
        this.revenue = AppropObj.revenue.filter('Cost Center', cc);
    }
}

export class Appropriation {
    constructor(fundObj, approp){
        this.personnel = fundObj.personnel.filter('Appropriation', approp);
        this.nonpersonnel = fundObj.personnel.filter('Appropriation', approp);
        this.overtime = fundObj.overtime.filter('Appropriation', approp);
        this.revenue = fundObj.revenue.filter('Appropriation', approp);
    }

    getCostCenters(){
        // build a set of unique appropriations across all line items for the fund
        const cc = new Set([...this.personnel.cc,
            ...this.overtime.cc, 
            ...this.nonpersonnel.cc, 
            ...this.revenue.cc]);

        // initialize a list placeholder for the appropriations objects
        ccList = [];
        // build out list
        cc.forEach(num => {
            ccList.append(new CostCenter(this, num));
        });
        return ccList;
    }

    total(){
        this.personnel.getSum() + this.overtime.getSum() + this.nonpersonnel.getSum();
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

    getAppropriations(){
        // build a set of unique appropriations across all line items for the fund
        const approps = new Set([...this.personnel.approps,
            ...this.overtime.approps, 
            ...this.nonpersonnel.approps, 
            ...this.revenue.approps]);

        // initialize a list placeholder for the appropriations objects
        appropsList = [];
        // build out list
        approps.forEach(approp => {
            appropsList.append(new Appropriation(this, approp));
        });
        return appropsList;
    }

    getPersonnelCost() {
        return this.personnel.getSum(); 
    }

    getOvertimeCost() {
        return this.overtime.getSum();
    }

    getNonPersonnelCost() {
        return this.nonpersonnel.getSum();
    }

    getRevenue() {
        return this.revenue.getSum();
    }

    getTotal() { 
        // only sum expenditures, not net of revenue
        return this.getNonPersonnelCost() + this.getOvertimeCost() + this.getPersonnelCost(); 
    }
}

export default Fund;