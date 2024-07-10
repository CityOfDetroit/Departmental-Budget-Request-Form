
import { fetchJSON } from "../../utils/data_utils/JSON_data_handlers.js";
import { DATA_ROOT } from "../../init.js";

const Content = {
    add : function(fund, new_content){
        var item = document.getElementById(`${fund}_header`);
        item.querySelector('.accordion-body').textContent = new_content;
    }
}

const Item = {
    html : function(fund, content) {
        return `<h2 class="accordion-header" id="${fund}_header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${fund}_content" aria-expanded="false" aria-controls="${fund}_content">
                        ${fund}
                    </button>
                </h2>
                <div id="${fund}_content" class="accordion-collapse collapse" aria-labelledby="${fund}_header" data-bs-parent="#summary-accordion">
                    <div class="accordion-body">${content}</div>
                </div>`
    },
    add : function(fund, content) {
        const parent = document.getElementById('summary-accordion');
        const item_element = document.createElement('div');
        item_element.classList.add('accordion-item');
        item_element.innerHTML = this.html(fund, content);
        parent.appendChild(item_element);
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
            Item.add(fund, `${fund} info`);
        });
    }
}

export default Accordion;
