import { FISCAL_YEAR } from '../../init';
import Cell from '../table/subcomponents/cells';
import { formatCurrency } from '../../utils/common_utils';
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
    tooltip.innerText = newText;
}

function showAccountString(event){
    const row = event.target.parentElement;
    const approp = Cell.getText(row, 'approp-name');
    const cc =  Cell.getText(row, 'cc-name');
    editTooltipText(`Appropriation: ${approp}
                    Cost Center: ${cc}`)
}

function showSalaryProjection(event){
    const row = event.target.parentElement;
    const general_increase = Cell.getText(row, 'general-increase-rate');
    const merit_increase =  Cell.getText(row, 'merit-increase-rate');
    const current_salary = Cell.getValue(row, 'current-salary');
    const proj_salary = Cell.getValue(row, 'avg-salary');
    if (current_salary){
        var message = `The average salary/wage for this position was 
            ${formatCurrency(current_salary)} as of September 20${FISCAL_YEAR-2}. With two general 
            increases of ${general_increase*100}% and a merit increase of ${merit_increase*100}%, the 
            Budget Office projects that the average annual 
            salary/wage for this position will be ${formatCurrency(proj_salary)} in FY${FISCAL_YEAR}.`;
    } else {
        var message = `The average salary/wage for this position was 
            unknown as of September 20${FISCAL_YEAR-2}, or the position
            did not exist. The Budget Office projects that 
            the average annual salary/wage for this position 
            will be ${formatCurrency(proj_salary)} in FY2026.`
    }

    editTooltipText(message);
}

function showFinalPersonnelCost(event){
    const row = event.target.parentElement;
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

export const Tooltip = {

    hide : hideTooltip,
    show : showTooltip,

    link : function(element, displayFn) {

        // add class to show cell with an underline, etc
        element.classList.add('tooltip-cell');

        // Create and append the Font Awesome info icon
        const infoIcon = document.createElement('i');
        infoIcon.classList.add('fas', 'fa-info-circle', 'info-icon');
        element.appendChild(infoIcon);

        // add event listener to show tooltip on mouseover
        element.addEventListener('click', function (event) {
            displayFn(event);
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
    },
    
    linkAccountStringCol : function() {
        // get all relevant cells
        document.querySelectorAll('.account-string').forEach( (cell) => {
            this.link(cell, showAccountString);
        })
    },

    linkSalaryCol : function() {
        // get all relevant cells
        document.querySelectorAll('.avg-salary').forEach( (cell) => {
            this.link(cell, showSalaryProjection);
        })
    },

    linkTotalPersonnelCostCol : function() {
        // get all relevant cells
        document.querySelectorAll('.total-baseline').forEach( (cell) => {
            this.link(cell, showFinalPersonnelCost);
        })
    },

    linkAll : function() {
        this.linkAccountStringCol();
        this.linkSalaryCol();
        this.linkTotalPersonnelCostCol();
    }
}

export default Tooltip