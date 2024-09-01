import './accordion.css'


import {Baseline, CurrentFund, Fund, Supplemental, FundLookupTable} from '../../models'
import { formatCurrency, cleanString } from "../../utils/common_utils.js";
import Table from "../table/table.js";
import { visitPage } from '../../views/view_logic.js';
import { Appropriation } from '../../models/fund.js';

function redirectForEdit(){
    const row = document.querySelector(`.active-editing`);
    const table = row.parentElement;
    const section = table.closest('.summary-container');
    // new initiative edits should all redirect to the new-inits page
    if (section.id == 'supp-accordion'){
        visitPage('new-inits');
    }
    else {
        const fund = table.id.replace('table-','');
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

const AppropriationTable = {
    
}

const ExpenseTable = {
    table_id : (id, segment) => { return `table-${segment}-${cleanString(id)}` },
    init(id, segment) {
        // create empty table and put it in the accordion
        var table = document.createElement('table');
        table.id = this.table_id(id, segment);
        table.classList.add('accordion-table');
        var parent = document.querySelector(`#${segment}_${cleanString(id)}_content .accordion-body`);
        parent.appendChild(table);
    },
    createNewCell(content, row, className) {
        const newCell = document.createElement('td');
        newCell.innerHTML = content;
        newCell.classList.add(className);
        row.appendChild(newCell);
    },
    addRow(id, segment, row_name, number){
        var table = document.getElementById(this.table_id(id, segment));
        var new_row = document.createElement('tr');
        table.appendChild(new_row);
        // Create a cell for the line item label
        this.createNewCell(row_name, new_row, 'line-item');
        // create a cell for the amount
        this.createNewCell(formatCurrency(number), new_row, 'cost');
        // create Edit button 
        var button = '';
        if (row_name != 'Net Expenditures (Revenues)'){
            button = Table.Buttons.Edit.html;
        }
        this.createNewCell(button, new_row);
    },
    fillFromFund(fund) {
        this.init(fund, 'fund');
        const fundObject = new Fund(fund);

        // Add a row for each appropriation in the fund
        const id = cleanString(fund);

        fundObject.getAppropriations().forEach( appropObj => {
            Item.add(appropObj.approp, `#baseline-accordion .summary-accordion #fund_${id}_content .accordion-body`, 'approp');
            Item.updateHeader(appropObj.name(), appropObj.approp, appropObj.total(), 'approp');
            // Item.fillFromApprop();
        })
    },
    fillFromApprop(fund, approp){

    },
    fillFromCC(fund, cc){
        this.addRow(fund, 'Personnel Expenditures', fundObject.getPersonnelCost());
        this.addRow(fund, 'Overtime Expenditures', fundObject.getOvertimeCost());
        this.addRow(fund, 'Non-Personnel Expenditures', fundObject.getNonPersonnelCost());
        this.addRow(fund, 'Revenues', fundObject.getRevenue());
        this.addRow(fund, 'Net Expenditures (Revenues)', fundObject.getTotal());
    },
    fillFromInit(program) {
        this.init(program.name);
        this.addRow(program.name, 'Expenditures', program.expenses());
        this.addRow(program.name, 'Revenues', program.revenue());
        this.addRow(program.name, 'Net Expenditures (Revenues)', program.net());
    }
}

const Item = {
    html : function(fund, segment = "fund") {
        var id = cleanString(fund);
        return `<h2 class="accordion-header" id="${segment}_${id}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${segment}_${id}_content" aria-expanded="false" aria-controls="fund_${id}_content">
                        <span class="name"></span>
                        <span class="amount"></span>
                    </button>
                </h2>
                <div id="${segment}_${id}_content" class="accordion-collapse collapse" aria-labelledby="${segment}_${id}_header">
                    <div class="accordion-body"></div>
                </div>`
    },
    add : function(id, accordion_query, segment) {
        // get accordion and add a new item to it
        const parent = document.querySelector(accordion_query);
        const item_element = document.createElement('div');
        item_element.classList.add('accordion-item');
        item_element.innerHTML = this.html(id, segment);
        parent.appendChild(item_element);
    },
    ExpenseTable : ExpenseTable,
    updateHeader : function(title, id, new_amount, segment) {
        var id = cleanString(id);
        const header_btn = document.querySelector(`#${segment}_${id}_header button`);
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
            Item.add(fund, '#baseline-accordion .summary-accordion', 'fund');
            Item.ExpenseTable.fillFromFund(fund);
            const fundObject = new Fund(fund);
            Item.updateHeader(FundLookupTable.getName(fund), fund, fundObject.getTotal(), 'fund');
        });
    },
    createSupp() {
        const supp = new Supplemental;
        supp.initiatives.forEach(program => {
            Item.add(program.name, '#supp-accordion .summary-accordion');
            Item.ExpenseTable.fillFromInit(program);
            Item.updateHeader(program.name, program.name, program.net(), 'fund');
        });
    },
    updateTopLines() {
        // adjuse baseline
        const baseline = new Baseline;
        const baselineAmount = document.querySelector('#baseline-title .top-line-amount')
        baselineAmount.textContent = formatCurrency(baseline.total());
        // adjust supplementals
        const supp = new Supplemental;
        const suppAmount = document.querySelector('#supp-title .top-line-amount')
        suppAmount.textContent = formatCurrency(supp.total());
        // color-code baseline
        if (baseline.total() <= Baseline.target()){
            baselineAmount.style.color = 'green';
        } else {
            baselineAmount.style.color = 'red';
        }
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
