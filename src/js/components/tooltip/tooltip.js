import { FISCAL_YEAR } from '../../constants/';
import Cell from '../table/subcomponents/cells';
import { formatCurrency } from '../../utils/common_utils';
import CurrentPage from '../../models/current_page';

import './tooltip.css'

function hideTooltip() {
    document.getElementById('tooltip').style.visibility = 'hidden';
}

function showTooltip() {
    document.getElementById('tooltip').style.visibility = 'visible';
}

function editTooltipText(newText){
    // edit text to display inside tooltip
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = newText;
}

function showAccountString(row){
    const approp = Cell.getText(row, 'approp-name');
    const cc =  Cell.getText(row, 'cc-name');
    const obj =  Cell.getText(row, 'object-name');
    const fund = Cell.getText(row, 'fund-name');
    var message = 
        `<strong>Fund</strong>: ${fund}<br>
        <strong>Appropriation</strong>: ${approp}<br>
        <strong>Cost Center</strong>: ${cc}`;
    if (obj) { message += `<br><strong>Object</strong>: ${obj}`}
    editTooltipText(message);
}

function showSalaryProjection(row){
    const general_increase = Cell.getText(row, 'general-increase-rate');
    const merit_increase =  Cell.getText(row, 'merit-increase-rate');
    const current_salary = Cell.getValue(row, 'current-salary');
    const proj_salary = Cell.getValue(row, 'avg-salary');
    if (current_salary){
        var message = `The average salary/wage for this position was 
            ${formatCurrency(current_salary)} as of September 20${FISCAL_YEAR-2}. 
            Given a ${general_increase*100}% general increase rate and a ${merit_increase*100}% 
            merit increase, the FY${FISCAL_YEAR} projection for this position's average 
            annual salary/wage is ${formatCurrency(proj_salary)}.`;
    } else {
        var message = `The average salary/wage for this position was 
            unknown as of September 20${FISCAL_YEAR-2}, or the position
            did not exist. The FY${FISCAL_YEAR} projection for this position's 
            average annual salary/wage is ${formatCurrency(proj_salary)}.`
    }

    editTooltipText(message);
}

function showFinalPersonnelCost(row){
    const proj_salary = Cell.getValue(row, 'avg-salary');
    const ftes = Cell.getText(row, 'baseline-ftes');
    const fringe = parseFloat(Cell.getText(row, 'fringe'));
    const avg_benefits = proj_salary * fringe;
    const message = `The total cost captures ${ftes} position(s) at
                    an annual salary/wage of ${formatCurrency(proj_salary)}, 
                    plus fringe benefits that cost ${formatCurrency(avg_benefits)} 
                    per position per year, on average.`
    editTooltipText(message);
}

function showFICA(row){
    const fica = parseFloat(Cell.getText(row, 'fica'));
    const ficaPercentage = (fica * 100).toFixed(2);
    const message = `This total is overtime wages plus overtime salary plus FICA (payroll tax), 
                     which is ${ficaPercentage}% for this cost center.`
    editTooltipText(message);
}

function showCPA(row){
    const cpa = parseFloat(Cell.getText(row, 'cpa'));
    const description = Cell.getText(row, 'cpa-description');
    const vendor = Cell.getText(row, 'vendor');
    const contract_end = Cell.getText(row, 'contract-end');
    const remaining = Cell.getValue(row, 'remaining');
    if (cpa) {
        var message = `<strong>CPA #${cpa}</strong>`;
    } else {
        var message = `No CPA`;
    }
    if (vendor) {message += `<br><strong>Vendor</strong>: ${vendor}`};
    if (description) {message += `<br><strong>Description</strong>: ${description}`};
    if (contract_end) {message += `<br><strong>Contract End Date</strong>: ${contract_end}`}
    if (remaining) {message += `<br><strong>Amount Remaining on Contract</strong>: ${formatCurrency(remaining)}`}

    editTooltipText(message);
}

function link(element, displayFn) {

    // add class to show cell with an underline, etc
    element.classList.add('tooltip-cell');

    // Create and append (detail)
    const detail = document.createElement('span');
    detail.classList.add('detail');
    detail.textContent = '(detail)';
    element.appendChild(detail);

    // add event listener to show tooltip on mouseover
    element.addEventListener('click', function (event) {
        const row = event.target.closest('tr');
        displayFn(row);
        showTooltip();
    });
    // and hide when mouse moves off
    element.addEventListener('mouseout', function () {
        hideTooltip();
    });
    // Update tooltip position on mouse move
    element.addEventListener('mousemove', function (event) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.top = (event.clientY + 10) + 'px';
        tooltip.style.left = (event.clientX + 10) + 'px';
    });
}

function linkAccountStringCol() {
    // get all relevant cells
    document.querySelectorAll('td.account-string').forEach( (cell) => {
        link(cell, showAccountString);
    })
}

function linkSalaryCol() {
    // get all relevant cells
    document.querySelectorAll('td.avg-salary').forEach( (cell) => {
        link(cell, showSalaryProjection);
    })
}

function linkTotalPersonnelCostCol() {
    // get all relevant cells
    document.querySelectorAll('td.total-baseline').forEach( (cell) => {
        link(cell, showFinalPersonnelCost);
    })
}

function linkTotalOTCol() {
    // get all relevant cells
    document.querySelectorAll('td.total').forEach( (cell) => {
        link(cell, showFICA);
    })
}

function linkCPACol() {
    // get all relevant cells
    document.querySelectorAll('td.cpa').forEach( (cell) => {
        link(cell, showCPA);
    })
}

export const Tooltip = {

    hide : hideTooltip,
    show : showTooltip,

    linkAll : () => {
        switch(CurrentPage.load()){
            case 'personnel' :
                linkAccountStringCol();
                linkSalaryCol();
                linkTotalPersonnelCostCol();
                break;
            case 'overtime':
                linkTotalOTCol();
                break;
            case 'nonpersonnel':
                linkAccountStringCol();
                linkCPACol();  
                break;
            case 'revenue':
                linkAccountStringCol();
                break;
            case 'new-inits':
                linkAccountStringCol();
                break;
            default:
                break;

        }
    },

    unlink : function() {
        let details = document.querySelectorAll('.detail');
        details.forEach( (span) => {
            span.remove();
        })
    }
}

export default Tooltip