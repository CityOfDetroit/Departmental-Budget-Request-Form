import { FISCAL_YEAR } from "../../../constants";
import { Baseline, FundLookupTable } from "../../../models";
import { formatCurrency } from "../../../utils/common_utils";

export const BaselineSection = {

    data : new Baseline(),
    
    fund_html(fund) {
        return `
            <h6>${FundLookupTable.getName(fund.fund)}</h6>
            <div class='sidebar-stat-line' id="target">
                <span class="stat-label">FY${FISCAL_YEAR} target:</span> 
                <span class="stat"></span>
            </div>
            <div class='sidebar-stat-line' id="baseline-revenue">
                <span class="stat-label">Projected revenues:</span> 
                <span class="stat">${formatCurrency(fund.getRevenue())}</span>
            </div>
            <div class='sidebar-stat-line' id="baseline-personnel">
                <span class="stat-label">Personnel cost:</span> 
                <span class="stat">${formatCurrency(fund.getPersonnelCost())}</span>
            </div>
            <div class='sidebar-stat-line' id="baseline-nonpersonnel">
                <span class="stat-label">Non-personnel cost:</span> 
                <span class="stat">${formatCurrency(fund.getNonPersonnelCost())}</span>
            </div>
            <div class='sidebar-stat-line' id="baseline-total">
                <span class="stat-label">Total baseline:</span> 
                <span class="stat">${formatCurrency(fund.getTotal())}</span>
            </div>
            <br>`
    },

    update() {
        // find spot in html to update sidebar
        const baselineDiv = document.querySelector('#baseline-stats');

        this.data.funds.forEach( (fund) => {
            var fundDiv = document.createElement('div');
            fundDiv.innerHTML = this.fund_html(fund);
            baselineDiv.appendChild(fundDiv);
        });

        // // color code based on target
        // var target = fetchStat('target');
        // if(this.data.total() <= target){
        //     document.querySelector('#baseline-total .stat').style.color = "green";
        // }
        // if(this.data.total() > target){
        //     document.querySelector('#baseline-total .stat').style.color = "red";
        // }

    }
}


// function replaceSidebarStat(stat_id, new_figure){
//     const span = document.querySelector(`#${stat_id} .stat`);
//     span.setAttribute('value', new_figure);
//     span.textContent = formatCurrency(new_figure);
// }

// function addTarget(target){
//     replaceSidebarStat('target', target);
// }

// // update all stats based on saved data
// async function updateBaseline(){
//     // gather info and update sidebar accordingly
//     var baseline = new Baseline();
//     replaceSidebarStat('baseline-revenue', baseline.revenue());
//     replaceSidebarStat('baseline-personnel', baseline.personnel());
//     replaceSidebarStat('baseline-nonpersonnel', baseline.nonpersonnel());
//     replaceSidebarStat('baseline-total', baseline.total());


// }