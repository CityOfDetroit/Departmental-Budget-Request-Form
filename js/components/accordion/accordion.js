import { Fund } from "../../utils/data_utils/local_storage_handlers.js";
import { formatCurrency } from "../../utils/common_utils.js";
import Table from "../table/table.js";
import { FundLookupTable } from "../../utils/data_utils/budget_data_handlers.js";

const FundTable = {
    table_id : (fund) => { return `table-${fund}` },
    init : function(fund) {
        // create empty table and put it in the accordion
        var table = document.createElement('table');
        table.id = this.table_id(fund);
        table.classList.add('accordion-table');
        var parent = document.querySelector(`#fund_${fund}_content .accordion-body`);
        parent.appendChild(table);
    },
    createNewCell : function(content, row) {
        const newCell = document.createElement('td');
        newCell.innerHTML = content;
        row.appendChild(newCell);
    },
    addRow : function(fund, name, number){
        var table = document.getElementById(this.table_id(fund));
        var new_row = document.createElement('tr');
        table.appendChild(new_row);
        // Create a cell for the line item label
        this.createNewCell(name, new_row);
        // create a cell for the amount
        this.createNewCell(formatCurrency(number), new_row);
        // create Edit button 
        var button = '';
        if (name != 'Net Expenses (Revenues)'){
            button = Table.Buttons.Edit.html;
        }
        this.createNewCell(button, new_row);
    },
    fill : function(fund) {
        this.init(fund);
        const fundObject = new Fund(fund);
        this.addRow(fund, 'Personnel Expenses', fundObject.getPersonnelCost());
        this.addRow(fund, 'Non-Personnel Expenses', fundObject.getNonPersonnelCost());
        this.addRow(fund, 'Revenue', fundObject.getRevenue());
        this.addRow(fund, 'Net Expenses (Revenues)', fundObject.getTotal());
    }
}

const Item = {
    html : function(fund) {
        var id = fund; // cleanString(fund);
        return `<h2 class="accordion-header" id="fund_${id}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fund_${id}_content" aria-expanded="false" aria-controls="fund_${id}_content">
                        <span class="name"></span>:
                        <span class="amount"></span>
                    </button>
                </h2>
                <div id="fund_${id}_content" class="accordion-collapse collapse" aria-labelledby="fund_${id}_header" data-bs-parent=".summary-accordion">
                    <div class="accordion-body"></div>
                </div>`
    },
    add : function(fund, accordion_id) {
        // get accordion and add a new item to it
        const parent = document.querySelector(`#${accordion_id} .summary-accordion`);
        const item_element = document.createElement('div');
        item_element.classList.add('accordion-item');
        item_element.innerHTML = this.html(fund);
        parent.appendChild(item_element);
        FundTable.fill(fund);
    },
    FundTable : FundTable,
    updateHeader : function(fund, new_amount) {
        const header_btn = document.querySelector(`#fund_${fund}_header button`);
        header_btn.querySelector('span.name').textContent = FundLookupTable.getName(fund);
        header_btn.querySelector('span.amount').textContent = formatCurrency(new_amount);
    }
}

export const Accordion = {
    Item : Item,
    hide : function(){
        document.querySelector('#accordion-div').style.display = 'none';
        // reset to delete content
        document.querySelector('#baseline-accordion .summary-accordion').innerHTML = '';
    },
    show : function(){
        document.querySelector('#accordion-div').style.display = 'block';
    },
    async createFromFunds(){
        var funds = FundLookupTable.listFunds();

        funds.forEach(fund => {
            Item.add(fund, 'baseline-accordion');
            const fundObject = new Fund(fund);
            Item.updateHeader(fund, fundObject.getTotal());
        });
    }
}

export default Accordion;
