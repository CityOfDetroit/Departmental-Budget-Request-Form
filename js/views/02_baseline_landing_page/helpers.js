
import Subtitle from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Table from "../../components/table/table.js";
import { DATA_ROOT } from "../../init.js";
import Body from "../../components/body/body.js";
import { CurrentFund } from '../../utils/data_utils/local_storage_handlers.js';
import FundLookupTable from '../../utils/data_utils/budget_data_handlers.js';

const fundCols = [
    { title: 'ID', className: 'fund-id' },
    { title: 'Name', className: 'fund-name' },
];

export function preparePageView(){
    
    CurrentFund.reset();

    // prepare page view
    Body.reset();
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
            selectFund(tableRows, this);
        });
    });
}

export async function initializeFundTable(){
    await Table.Data.loadFromJSON(DATA_ROOT + 'funds.json');
    Table.adjustWidth('30%');
    Table.show();
    Table.Columns.assignClasses(fundCols);
    allowRowSelection();
}

function selectFund(tableRows, selected_row){
    // remove selected class from any other rows
    tableRows.forEach(function(tableRow) {
        tableRow.classList = '';
    });
    // add selected class to clicked row
    selected_row.classList.add('selected');
    // get fund and save selected fund
    var fund = selected_row.querySelector('.fund-id').textContent;
    CurrentFund.update(fund);
    // enable next step
    NavButtons.Next.enable();
}