
import { fetchJSON } from "../../utils/data_utils/JSON_data_handlers.js";
import { DATA_ROOT } from "../../init.js";
import { Fund } from "../../utils/data_utils/local_storage_handlers.js";
import { cleanString, formatCurrency } from "../../utils/common_utils.js";
import Table from "../table/table.js";

const FundTable = {
    table_id : (fund) => { return `table-${cleanString(fund)}` },
    init : function(fund) {
        // create empty table and put it in the accordion
        var table = document.createElement('table');
        table.id = this.table_id(fund);
        table.classList.add('accordion-table');
        var parent = document.querySelector(`#${cleanString(fund)}_content .accordion-body`);
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
        if (name != 'Total'){
            button = Table.Buttons.Edit.html;
        }
        this.createNewCell(button, new_row);
    },
    fill : function(fund) {
        this.init(fund);
        const fundObject = new Fund(fund);
        this.addRow(fund, 'Personnel', fundObject.getPersonnelCost());
        this.addRow(fund, 'Non-Personnel', fundObject.getNonPersonnelCost());
        this.addRow(fund, 'Revenue', fundObject.getRevenue());
        this.addRow(fund, 'Total', fundObject.getTotal());
    }
}

const Item = {
    html : function(fund) {
        var id = cleanString(fund);
        return `<h2 class="accordion-header" id="${id}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}_content" aria-expanded="false" aria-controls="${id}_content">
                        <span class="name"></span>:
                        <span class="amount"></span>
                    </button>
                </h2>
                <div id="${id}_content" class="accordion-collapse collapse" aria-labelledby="${id}_header" data-bs-parent="#summary-accordion">
                    <div class="accordion-body"></div>
                </div>`
    },
    add : function(fund) {
        // get accordion and add a new item to it
        const parent = document.getElementById('summary-accordion');
        const item_element = document.createElement('div');
        item_element.classList.add('accordion-item');
        item_element.innerHTML = this.html(fund);
        parent.appendChild(item_element);
        FundTable.fill(fund);
    },
    FundTable : FundTable,
    updateHeader : function(fund, new_amount) {
        const header_btn = document.querySelector(`#${cleanString(fund)}_header button`);
        header_btn.querySelector('span.name').textContent = fund;
        header_btn.querySelector('span.amount').textContent = formatCurrency(new_amount);
    }
}

export const Accordion = {
    Item : Item,
    hide : function(){
        document.getElementById('accordion-div').style.display = 'none';
        // reset to delete content
        document.getElementById('summary-accordion').innerHTML = '';
    },
    show : function(){
        document.getElementById('accordion-div').style.display = 'block';
    },
    async createFromFunds(){
        var funds = await fetchJSON(DATA_ROOT + 'funds.json');
        funds = funds.map((item) => { return item.Name });
        funds.forEach(fund => {
            Item.add(fund);
            const fundObject = new Fund(fund);
            Item.updateHeader(fund, fundObject.getTotal());
        });
    }
}

export default Accordion;
