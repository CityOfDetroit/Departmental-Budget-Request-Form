import { FISCAL_YEAR } from "../../../constants";
import { Baseline, FundLookupTable, Fund } from "../../../models";
import { formatCurrency } from "../../../utils/common_utils";

export const BaselineSection = {

    data : new Baseline(),
    genFund : new Fund(1000),

    target_html() {
        
        return `
            <div class='sidebar-stat-line' id="baseline-total">
                <span class="stat-label">Baseline total:</span> 
                <span class="stat">${formatCurrency(this.data.total())}</span>
            </div>
            <div class='sidebar-stat-line' id="target">
                <span class="stat-label">GF target:</span> 
                <span class="stat">${formatCurrency(Baseline.target())}</span>
            </div>
            <div class='sidebar-stat-line' id="GF-total">
                <span class="stat-label">Current GF total:</span> 
                <span class="stat">${formatCurrency(this.genFund.getTotal())}</span>
            </div>
            <br>`
    },
    
    fund_html(fund) {
        return `
            <h6>${FundLookupTable.getName(fund.fund)}</h6>
            <hr>
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
                <span class="stat-label">Fund total:</span> 
                <span class="stat">${formatCurrency(fund.getTotal())}</span>
            </div>
            <br>`
    },

    update() {
        // find spot in html to update sidebar
        const baselineDiv = document.querySelector('#baseline-stats');
        // add target info
        baselineDiv.innerHTML = this.target_html();

        this.data.funds.forEach( (fund) => {
            var fundDiv = document.createElement('div');
            fundDiv.id = `fund_${fund.fund}`;
            fundDiv.innerHTML = this.fund_html(fund);
            baselineDiv.appendChild(fundDiv);
        });

        console.log(this.genFund.getTotal())
        // color code based on target
        if(this.genFund.getTotal() <= Baseline.target()){
            
            document.querySelector('#GF-total .stat').style.color = "green";
        } else {
            document.querySelector('#GF-total .stat').style.color = "red";
        }
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