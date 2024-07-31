import { FISCAL_YEAR } from "../../../constants";
import { Baseline, FundLookupTable, Fund } from "../../../models";
import { formatCurrency } from "../../../utils/common_utils";
export const BaselineSection = {
    _data: new Baseline(),
    _genFund : new Fund(1000),

    get data() {
        this._data = new Baseline();
        return this._data;
    },

    set data(newData) {
        this._data = newData;
    },

    get genFund() {
        this._genFund = new Fund(1000);
        return this._genFund;
    },

    set genFund(newFund) {
        this._genFund = newFund;
    },

    target_html() {
        return `
            <div class='sidebar-stat-line' id="baseline-total">
                <span class="stat-label">Baseline total:</span> 
                <span class="stat">${formatCurrency(this.data.total())}</span>
            </div>
            <div class='sidebar-stat-line' id="target">
                <span class="stat-label">FY${FISCAL_YEAR} GF target:</span> 
                <span class="stat">${formatCurrency(Baseline.target())}</span>
            </div>
            <div class='sidebar-stat-line' id="GF-total">
                <span class="stat-label">Current GF total:</span> 
                <span class="stat">${formatCurrency(this.genFund.getTotal())}</span>
            </div>
            <br>`;
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
            <br>`;
    },

    update() {
        const baselineDiv = document.querySelector('#baseline-stats');
        baselineDiv.innerHTML = this.target_html();

        this.data.funds.forEach((fund) => {
            var fundDiv = document.createElement('div');
            fundDiv.id = `fund_${fund.fund}`;
            fundDiv.innerHTML = this.fund_html(fund);
            baselineDiv.appendChild(fundDiv);
        });

        if(this.genFund.getTotal() <= Baseline.target()){
            document.querySelector('#GF-total .stat').style.color = "green";
        } else {
            document.querySelector('#GF-total .stat').style.color = "red";
        }
    }
};