import Cell from '../table/subcomponents/cells';
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

export const Tooltip = {

    hide : hideTooltip,
    show : showTooltip,

    link : function(element) {

        // add class to show cell with an underline, etc
        element.classList.add('tooltip-cell');

        // Create and append the Font Awesome info icon
        const infoIcon = document.createElement('i');
        infoIcon.classList.add('fas', 'fa-info-circle', 'info-icon');
        element.appendChild(infoIcon);
        
        // add event listener to show tooltip on mouseover
        element.addEventListener('click', function (event) {
            showAccountString(event);
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
            this.link(cell);
        })
    }
}

export default Tooltip