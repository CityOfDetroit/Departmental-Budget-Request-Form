
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
        if (this.table){
            // reassign underlying data in object if there's data to filter
            this.table = this.table.filter(row => {   
                return (row[key]) && (row[key] == value);
            });
        }
        return this;
    }

}

export class CostCenter{
    constructor(fund, approp, cc){
        const AppropObj = new Appropriation(fund, approp);
        this.personnel = AppropObj.personnel.filter('Cost Center', cc);
        this.nonpersonnel = AppropObj.nonpersonnel.filter('Cost Center', cc);
        this.overtime = AppropObj.overtime.filter('Cost Center', cc);
        this.revenue = AppropObj.revenue.filter('Cost Center', cc);
        this.cc = cc;
        this.account_string = `${AppropObj.accountString()}-${cc}`;
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

    getName(){
        // just grab the value in the approp name column for the first row of the first non-empty table
        const tables = [this.nonpersonnel.table, this.personnel.table, this.overtime.table, this.revenue.table];

        for (let table of tables) {
          if (table.length > 0 && table[0]['Cost Center Name']) {
            return 'Cost Center ' + table[0]['Cost Center Name'];
          }
        }
    
        // If all tables are empty, return ''
        return '';
    }  

    accountString() {
        return this.account_string;
    }
}

export class Appropriation {
    constructor(fund, approp){
        const fundObj = new Fund(fund);
        this.personnel = fundObj.personnel.filter('Appropriation', approp);
        this.nonpersonnel = fundObj.nonpersonnel.filter('Appropriation', approp);
        this.overtime = fundObj.overtime.filter('Appropriation', approp);
        this.revenue = fundObj.revenue.filter('Appropriation', approp);
        // own data
        this.approp = approp;
        this.fund = fundObj.fund;

    }

    getCostCenters(){
        // build a set of unique appropriations across all line items for the fund
        const cc = new Set([...this.personnel.cc,
            ...this.overtime.cc, 
            ...this.nonpersonnel.cc, 
            ...this.revenue.cc]);

        // initialize a list placeholder for the appropriations objects
        const ccList = [];
        // build out list
        cc.forEach(num => {
            ccList.push(new CostCenter(this.fund, this.approp, num));
        });
        return ccList;
    }

    total(){
        return this.personnel.getSum() + this.overtime.getSum() + this.nonpersonnel.getSum();
    }

    name(){
        // just grab the value in the approp name column for the first row of the first non-empty table
        const tables = [this.nonpersonnel.table, this.personnel.table, this.overtime.table, this.revenue.table];

        for (let table of tables) {
          if (table.length > 0 && table[0]['Appropriation Name']) {
            return 'Appropriation ' + table[0]['Appropriation Name'];
          }
        }
    
        // If all tables are empty, return ''
        return '';
    }  

    accountString(){
        return `${this.fund}-${this.approp}`;
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
        const appropsList = [];
        // build out list
        approps.forEach(approp => {
            appropsList.push( new Appropriation(this.fund, approp) );
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