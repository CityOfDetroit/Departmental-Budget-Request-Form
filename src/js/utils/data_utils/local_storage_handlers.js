import { FISCAL_YEAR } from "../../init.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import { initializePages, visitPage } from "../../views/view_logic.js";
import { fetchJSON } from "./JSON_data_handlers.js";
import { FundLookupTable } from "./budget_data_handlers.js";
import { convertToJSON } from "./JSON_data_handlers.js";

export const CurrentPage = {
    update : function(page){
        localStorage.setItem('page_state', page);
    },
    load : function(){
        const pageState = localStorage.getItem('page_state');
        return pageState !== null ? pageState : 'welcome';
    },
    visit : function(){
        visitPage(this.load());
    }
}

export const CurrentFund = {
    update : function(fund){
        localStorage.setItem('fund', fund);
    },
    number : function(){
        return localStorage.getItem("fund");
    },
    name : function(){
        return FundLookupTable.getName( this.number());
    },
    reset : function() {
        this.update('');
    }
}

// TODO: consider moving this into a const for Current Table (or to the table component)
export function saveTableData() {
    var table = document.getElementById('main-table');
    if (CurrentFund.number()) {
        var save_as = `${CurrentPage.load()}_${CurrentFund.number()}`;
    } else {
        var save_as = CurrentPage.load();
    }
    localStorage.setItem(save_as, convertToJSON(table, ['Edit']));
    console.log('saved');
    Sidebar.updateTotals();
}

function deleteTable(name){
    localStorage.setItem(name, '');
}

export async function deleteAllTables(){
    var funds = await fetchJSON(DATA_ROOT + 'funds.json');
    funds = funds.map((item) => { return item.Name });
    for (const page in initializePages()){
        for(const i in funds){
            deleteTable(`${page}_${funds[i]}`);
        }
    }
    deleteTable('new-inits');
}

export function loadTableData(name){
    const data = localStorage.getItem(name);
    if ( data == '' || data == '[]' ) {
        return 0;
    };
    return JSON.parse(data);
}

// Class to hold information on a specific fund and table
class StoredTable {
    constructor(page, fund){
        this.name = `${page}_${fund}`;
        this.page = page;
        this.table = loadTableData(this.name);
    }

    totalCol() {
        switch(this.page){
            case 'personnel':
                return 'Total Cost';
            case 'overtime':
                return 'Total Cost (including benefits)';
            case 'nonpersonnel':
                return `FY${FISCAL_YEAR} Request`;
            case 'revenue':
                return `Departmental Request Total`;
            default:
                break;
        }
    }
    getSum() {
        // fill with zero until there is something saved in storage
        return colSum(this.table, this.totalCol(), this.name);
    }

}

function colSum(table, colName) {
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
        return this.getNonPersonnelCost() + this.getPersonnelCost() - this.getRevenue() 
    }
}

export class Baseline {
    // baseline will just contain a list of funds
    constructor() {
        const allFunds = FundLookupTable.listFunds();
        this.funds = [];
        allFunds.forEach((fund) => { 
            this.funds.push(new Fund(fund));
        });
    } 

    personnel() {
        let total = 0;
        this.funds.forEach(fund => {
            total += fund.getPersonnelCost();
        });
        return total;
    }

    nonpersonnel() {
        let total = 0;
        this.funds.forEach(fund => {
            total += fund.getNonPersonnelCost();
        });
        return total;
    }

    revenue() {
        let total = 0;
        this.funds.forEach(fund => {
            total += fund.getRevenue();
        });
        return total;
    }

    total() {
        return this.nonpersonnel() + this.personnel() - this.revenue();
    }
}

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

    net() { return this.expenses() - this.revenue() }

}

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
