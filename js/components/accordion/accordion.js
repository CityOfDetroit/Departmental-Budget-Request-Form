
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
        // create Edit button (placeholder for now)
        const button = Table.Buttons.Edit.html;
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

const Content = {
    add : function(fund, new_content){
        var item = document.getElementById(`${fund}_header`);
        item.querySelector('.accordion-body').textContent = new_content;
    },
    table : function(fund) {
        var table = document.createElement('table');
        table.id
        const line_items = [{'Personnel' : fund.getPersonnelCost()}, 
                            {'Non-Personnel' : fund.getNonPersonnelCost()},
                            {'Revenue' : fund.getRevenue()}]
        for (let i = 0; i < line_items.length; i++) {
            // create new row and add it to the table
            var new_row = document.createElement('tr');
            table.appendChild(new_row);
            // Create a cell for 
            const newCell = document.createElement('td');
            newCell.textContent = line_items[i];
            new_row.appendChild(newCell);
        }
        return table.outerHTML;
    }
}

const Item = {
    html : function(fund, content) {
        var id = cleanString(fund);
        return `<h2 class="accordion-header" id="${id}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}_content" aria-expanded="false" aria-controls="${id}_content">
                        ${fund}
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
    Content : Content
}

export const Accordion = {
    Item : Item,
    hide : function(){
        document.getElementById('summary-accordion').style.display = 'none';
    },
    show : function(){
        document.getElementById('summary-accordion').style.display = 'block';
    },
    async createFromFunds(){
        var funds = await fetchJSON(DATA_ROOT + 'funds.json');
        funds = funds.map((item) => { return item.Name });
        funds.forEach(fund => {
            Item.add(fund);
        });
    }
}

export default Accordion;
