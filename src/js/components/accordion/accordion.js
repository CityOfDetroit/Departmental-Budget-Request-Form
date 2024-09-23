import './accordion.css'


import {Baseline, CurrentFund, Fund, Supplemental, FundLookupTable} from '../../models'
import { formatCurrency, cleanString } from "../../utils/common_utils.js";
import Table from "../table/table.js";
import { visitPage } from '../../views/view_logic.js';

function redirectForEdit(){
    const row = document.querySelector(`.active-editing`);
    const table = row.parentElement;
    const section = table.closest('.summary-container');
    // new initiative edits should all redirect to the new-inits page
    if (section.id == 'supp-accordion'){
        visitPage('new-inits');
    }
    else {
        // Split the string into parts using '-' as the delimiter; retain fund as 1st numeric segment
        const fund = table.id.split('-')[1]
        
        CurrentFund.update(fund);
        const lineItem = row.querySelector('.line-item').textContent;
        // visit the correct page for editing
        switch(lineItem){
            case 'Personnel Expenditures':
                visitPage('personnel');
                break;
            case 'Non-Personnel Expenditures':
                visitPage('nonpersonnel');
                break;
            case 'Revenues':
                visitPage('revenue');
                break;
            case 'Overtime Expenditures':
                visitPage('overtime');
                break;
            default:
                console.error('Name of line item in table does not match a page destination.')
        }
    }
}

const ExpenseTable = {
    table_id : (account_string) => { return `table-${account_string}` },
    init(account_string) {
        // create empty table and put it in the accordion
        var table = document.createElement('table');
        table.id = this.table_id(account_string);
        table.classList.add('accordion-table');
        var parent = document.querySelector(`#string_${account_string}_content .accordion-body`);
        parent.appendChild(table);
    },
    createNewCell(content, row, className) {
        const newCell = document.createElement('td');
        newCell.innerHTML = content;
        newCell.classList.add(className);
        row.appendChild(newCell);
    },
    addRow(account_string, row_name, number){
        var table = document.getElementById(this.table_id(account_string));
        var new_row = document.createElement('tr');
        table.appendChild(new_row);
        // Create a cell for the line item label
        this.createNewCell(row_name, new_row, 'line-item');
        // create a cell for the amount
        this.createNewCell(formatCurrency(number), new_row, 'cost');
        // create Edit button 
        var button = '';
        if (row_name != 'Total Expenditures'){
            button = Table.Buttons.Edit.html(`Edit in table`);
        }
        this.createNewCell(button, new_row);
    },
    fillFromFund(fund) {
        // use just fund as account string to initialize table inside accordion
        this.init(fund);
        const fundObject = new Fund(fund);

        // Add a row for each appropriation in the fund
        const id = cleanString(fund);

        fundObject.getAppropriations().forEach( appropObj => {
            // if the total for the appropriation is > $0, add an accordion for all the CCs
            if ( appropObj.total() != 0 ){
                Item.add(appropObj.accountString(), `#string_${id}_content .accordion-body`);
                Item.updateHeader(appropObj.name(), appropObj.accountString(), appropObj.total());
                this.fillFromApprop(appropObj);
            }
        })
    },
    fillFromApprop(appropObj){
        // initialize the table object
        this.init(appropObj.accountString());
        // add a collapsible row for each cost center
        appropObj.getCostCenters().forEach( ccObj => {
            if (ccObj.getTotal() != 0 ){
                Item.add(ccObj.accountString(), `#string_${appropObj.accountString()}_content .accordion-body`);
                Item.updateHeader(ccObj.getName(), ccObj.accountString(), ccObj.getTotal());
                this.fillFromCC(ccObj);
            }
        })
        
    },
    fillFromCC(ccObj){
        // initialize a table and summarize the line items
        this.init(ccObj.accountString());
        this.addRow(ccObj.accountString(), 'Personnel Expenditures', ccObj.getPersonnelCost());
        this.addRow(ccObj.accountString(), 'Overtime Expenditures', ccObj.getOvertimeCost());
        this.addRow(ccObj.accountString(), 'Non-Personnel Expenditures', ccObj.getNonPersonnelCost());
        this.addRow(ccObj.accountString(), 'Revenues', ccObj.getRevenue());
        this.addRow(ccObj.accountString(), 'Total Expenditures', ccObj.getTotal());
    },
    fillFromInit(program) {
        // Fill out info for each supplemental init
        this.init(program.id());
        this.addRow(program.id(), 'Estimated Revenue', program.revenue());
        this.addRow(program.id(), 'Personnel Expenditures', program.personnel());
        this.addRow(program.id(), 'Non-Personnel Operating', program.operating());
        this.addRow(program.id(), 'Non-Personnel Capital', program.capital());
        this.addRow(program.id(), 'Total Expenditures', program.total());
    }
}

const Item = {
    accountString(fund, approp = '', cc = '') {
        var account_string = cleanString(fund);
        if (approp) { account_string += approp };
        if (cc) { account_string += cc };
        return account_string;
    },
    html(account_string){
        return `<h2 class="accordion-header" id="string_${account_string}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#string_${account_string}_content" aria-expanded="false" aria-controls="string_${account_string}">
                        <span class="name"></span>
                        <span class="amount"></span>
                    </button>
                </h2>
                <div id="string_${account_string}_content" class="accordion-collapse collapse" aria-labelledby="string_${account_string}_header">
                    <div class="accordion-body"></div>
                </div>`
    },
    add : function(account_string, accordion_query) {
        // get accordion and add a new item to it
        const parent = document.querySelector(accordion_query);
        const item_element = document.createElement('div');
        item_element.classList.add('accordion-item');
        item_element.innerHTML = this.html(account_string);
        parent.appendChild(item_element);
    },
    ExpenseTable : ExpenseTable,
    updateHeader : function(title, account_string, new_amount) {
        const header_btn = document.querySelector(`#string_${account_string}_header button`);
        header_btn.querySelector('span.name').textContent = title;
        header_btn.querySelector('span.amount').textContent = formatCurrency(new_amount);
    }
}

const AddInitButton = {
    init() {
        const btn = document.querySelector('.btn-add-init');
        btn.addEventListener('click', function(){
            visitPage('new-inits');
        })
    }
}

export const Accordion = {
    Item : Item,
    AddInitButton: AddInitButton,
    hide : function(){
        document.querySelector('#accordion-div').style.display = 'none';
        // reset to delete content
        document.querySelector('#baseline-accordion .summary-accordion').innerHTML = '';
        document.querySelector('#supp-accordion .summary-accordion').innerHTML = '';
    },
    show : function(){
        document.querySelector('#accordion-div').style.display = 'block';
    },
    async createBaseline(){
        var funds = FundLookupTable.listFunds();
        funds.forEach(fund => {
            Item.add(fund, '#baseline-accordion .summary-accordion');
            Item.ExpenseTable.fillFromFund(fund);
            const fundObject = new Fund(fund);
            Item.updateHeader(`Fund ${FundLookupTable.getName(fund)}`, fund, fundObject.getTotal());
        });

        // color-code GF baseline
        const GF = new Fund(1000);
        // text to color code
        let topline = document.querySelector('#string_1000_header .amount');
        if (GF.getTotal() <= Baseline.target()){
            topline.style.color = 'green';
            topline.style.weight = 4;
        } else {
           topline.style.color = 'red';
        }
    },
    createSupp() {
        const supp = new Supplemental;
        supp.initiatives.forEach(program => {
            Item.add(program.id(), '#supp-accordion .summary-accordion');
            Item.ExpenseTable.fillFromInit(program);
            Item.updateHeader(program.name, program.id(), program.total());
        });
    },
    updateTopLines() {
        // adjuse baseline
        // const baseline = new Baseline;
        const baseline = new Baseline;
        const baselineAmount = document.querySelector('#baseline-title .top-line-amount')
        baselineAmount.textContent = formatCurrency(baseline.total());
        // adjust supplementals
        const supp = new Supplemental;
        const suppAmount = document.querySelector('#supp-title .top-line-amount')
        suppAmount.textContent = formatCurrency(supp.total());

    },
    build() {
        this.createBaseline();
        this.createSupp();
        // initialize edit buttons
        Table.Buttons.Edit.init(redirectForEdit);
        this.AddInitButton.init();
        this.updateTopLines();
    }
}


export default Accordion;
