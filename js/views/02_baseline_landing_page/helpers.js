
import Subtitle from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Table from "../../components/table/table.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";

const fundCols = [
    { title: 'ID', className: 'fund-id' },
    { title: 'Name', className: 'fund-name' },
];

export function preparePageView(){
    
    localStorage.setItem("fund", '');

    // prepare page view
    Body.clearAll();
    NavButtons.show();

    // update page text
    Subtitle.update('Baseline Budget Request');
    // TODO: update to make dynamic
    Prompt.Text.update(`We will now ask you a series of questions about your BASELINE budget request.
        At the end, we will ask you about any new initiatives (ie. supplemental requests).
        Select one of your funds to begin.`);
}

function allowRowSelection(){
    var tableRows = document.querySelectorAll("tbody tr");
    tableRows.forEach(function(row) {
        row.addEventListener('mouseover', function() {
            this.classList.add('hover-effect');
        });
        row.addEventListener('mouseout', function() {
            this.classList.remove('hover-effect');
        });
        row.addEventListener('click', function() {
            tableRows.forEach(function(tableRow) {
                tableRow.classList = '';
            });
            this.classList.add('selected');
            // get fund
            var fund = this.querySelector('.fund-name').textContent;
            // save selected fund
            localStorage.setItem("fund", fund);
        });
    });
}

export async function initializeFundTable(){
    await Table.Data.loadFromJSON(DATA_ROOT + 'funds.json')
    Table.adjustWidth('100%');
    Table.show();
    Table.Columns.assignClasses(fundCols);
    allowRowSelection();
}