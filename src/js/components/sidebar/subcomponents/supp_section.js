import { Supplemental } from "../../../models";
import { formatCurrency } from "../../../utils/common_utils";

export const SuppSection = {
    html() {
        var supp = new Supplemental;
        return `
            <div class='sidebar-stat-line' id="supp-revenue">
                <span class="stat-label">Estimated revenues:</span> 
                <span class="stat">${formatCurrency(supp.revenue())}</span>
            </div>
            <div class='sidebar-stat-line' id="supp-expenses">
                <span class="stat-label">Esimated expenditures:</span> 
                <span class="stat">${formatCurrency(supp.expenses())}</span>
            </div>
            <div class='sidebar-stat-line' id="supp-total">
                <span class="stat-label">Total supplemental:</span> 
                <span class="stat">${formatCurrency(supp.total())}</span>
            </div>`
    },

    update() {
        const suppDiv = document.querySelector('#supp-stats');
        suppDiv.innerHTML = this.html();
    }
}

export default SuppSection;