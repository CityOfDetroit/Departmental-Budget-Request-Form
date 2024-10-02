import { Supplemental } from "../../../models";
import { formatCurrency } from "../../../utils/common_utils";
import { visitPage } from "../../../views/view_logic";

export const SuppSection = {
    html() {
        var supp = new Supplemental;
        return `
            <div class='sidebar-stat-line' id="supp-expenses">
                <span class="stat-label">Total expenditures:</span> 
                <span class="stat">${formatCurrency(supp.total())}</span>
                <i class="fas fa-edit edit-supp" title="Jump to page"></i>
            </div>`
    },

    linkEditBtns() {
        let btns = document.querySelectorAll('.edit-supp');
        btns.forEach((btn) => {
            btn.addEventListener('click', function() {
                visitPage('new-inits');
            });
        });
    },

    update() {
        const suppDiv = document.querySelector('#supp-stats');
        suppDiv.innerHTML = this.html();
        this.linkEditBtns();
    }
}

export default SuppSection;