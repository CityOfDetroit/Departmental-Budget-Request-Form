import { FISCAL_YEAR, DATA_ROOT } from "../../init.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import { PAGES, visitPage } from "../../views/view_logic.js";
import { fetchJSON } from "./JSON_data_handlers.js";
import FundLookupTable from "./budget_data_handlers.js";


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
        const fundNumber = loadFundState();
        return FundLookupTable.getName(fundNumber);
    },
    reset : function() {
        this.update('');
    }
}

// TODO: consider moving this into a const for Current Table (or to the table component)
export function saveTableData() {
    var table = document.getElementById('main-table');
    if (loadFundState()) {
        var save_as = `${loadPageState()}_${loadFundState()}`;
    } else {
        var save_as = loadPageState();
    }
    var rows = table.rows;
    var tableData = [];
    for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].cells;
        var rowData = [];
        for (var j = 0; j < cols.length; j++) {
            // if a formatted cost, save the underlying value instead
            if (cols[j].classList.contains('cost')) {
                rowData.push(cols[j].getAttribute('value'));
            } else {
                rowData.push(cols[j].innerText);
            }
        }
        tableData.push(rowData);
    }
    // Save JSON string to localStorage
    localStorage.setItem(save_as, JSON.stringify(tableData));
    Sidebar.updateTotals();
}

function deleteTable(name){
    localStorage.setItem(name, '');
}

export async function deleteAllTables(){
    var funds = await fetchJSON(DATA_ROOT + 'funds.json');
    funds = funds.map((item) => { return item.Name });
    for (const page in PAGES){
        for(const i in funds){
            deleteTable(`${page}_${funds[i]}`);
        }
    }
    deleteTable('new-inits');
}

export function loadTableData(name){
    const data = localStorage.getItem(name);
    if ( data == '' ) {
        return '';
    }
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
                break;
            default:
                break;
        }
    }
    getSum() {
        // fill with zero until there is something saved in storage
        return colSum(this.table, this.totalCol());
    }

}

function colSum(table, colName) {
    // fill with zero until there is something saved in storage
    if(!table || table == ''){ 
        return 0; 
    }
    var col_index = table[0].indexOf(colName);
    let sum = 0;
    for (let i = 1; i < table.length; i++){
        sum += Math.round(parseFloat(table[i][col_index]));
    }
    return sum;
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
    constructor(fund_names) {
        this.fund_names = fund_names;
        this.funds = [];
        fund_names.forEach((fund) => { 
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

export class Supplemental {
    constructor() {
        this.table = loadTableData('new-inits');
    }

    getInits() {
        return this.table.map((item) => { return item['Initiative Name'] });
    }

    personnel() {
        return colSum(this.table, 'Personnel Cost');
    }

    nonpersonnel() {
        return colSum(this.table, 'Non-personnel Cost');
    }

    revenue() {
        return colSum(this.table, 'Revenue');
    }

    total(){
        return this.personnel() + this.nonpersonnel() - this.revenue();
    }

}
