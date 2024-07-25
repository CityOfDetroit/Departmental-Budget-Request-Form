
import { FISCAL_YEAR } from "../../init.js"
import Body from "../../components/body/body.js";
import NavButtons from "../../components/nav_buttons/nav_buttons.js";
import Subtitle from "../../components/header/header.js";
import Form from "../../components/form/form.js";
import Modal from "../../components/modal/modal.js";
import Prompt from "../../components/prompt/prompt.js";
import Table from '../../components/table/table.js'
import Sidebar from "../../components/sidebar/sidebar.js";
import { Services } from "../../utils/data_utils/budget_data_handlers.js";
import Tooltip from "../../components/tooltip/tooltip.js";


export function preparePageView(){
    // prepare page view
    Body.reset();
    NavButtons.show();
    Sidebar.show();
    Table.adjustWidth('90%');
    NavButtons.Next.enable();

    // update page text
    Subtitle.update('Personnel');
    Prompt.Text.update(`
        This table displays the number of FTEs in each job code for in your department's 
        current (amended) FY25 budget. To make edits to the number of positions, click the
        "Edit" button on the row you would like to edit. The "Total Cost" column and the 
        summary sidebar will also update to reflect any edits.
    `);
}

function assignClasses() {
    // record columns and their classes
    const personnelColumns = [
        { title: 'Job Title', className: 'job-name' },
        { title: 'Account String', className: 'account-string' },
        { title: 'Service', className: 'service' },
        { title: `FY${FISCAL_YEAR} Requested FTE`, className: 'baseline-ftes' },
        { title: `FY${FISCAL_YEAR} Average Projected Salary/Wage`, className: 'avg-salary', isCost: true },
        { title: 'Total Cost', className: 'total-baseline', isCost: true },
        { title: 'Edit', className: 'edit' },
        // hidden columns needed for calculations
        { title: 'Fringe Benefits Rate', className: 'fringe', hide: true },
        { title: 'Appropriation Name', className: 'approp-name', hide: true },
        { title: 'Cost Center Name', className: 'cc-name',  hide: true },
        { title: 'General Increase Rate', className: 'general-increase-rate', hide: true},
        { title: 'Step/Merit Increase Rate', className: 'merit-increase-rate', hide: true},
        { title: `Average Salary/Wage as of 9/1/20${FISCAL_YEAR-2}`, className: 'current-salary', isCost: true, hide: true},
    ];

    // assign cost classes
    Table.Columns.assignClasses(personnelColumns)
}

function personnelRowOnEdit(){
    Table.Cell.createTextbox('baseline-ftes');
    Table.Cell.createServiceDropdown(Services.list());
}

export async function initializePersonnelTable(){
    // load table data from local storage
    if(await Table.Data.load()) {
        //after table is loaded, show it
        Table.show();
        Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, 'Edit');
        assignClasses();
        // add up the baseline costs and update sidebar
        updateDisplayandTotals();
        // activate edit buttons
        Table.Buttons.Edit.init(personnelRowOnEdit, updateDisplayandTotals);
        initializeRowAddition();
    } else {
        Prompt.Text.update('No personnel expenditures for this fund.')
    }
}

function initializeRowAddition(){
    Table.Buttons.AddRow.updateText("Add new job");
    Table.Buttons.AddRow.show();
}

// update sidebar and also cost totals when the FTEs are edited
function updateDisplayandTotals(){
    // calculate for each row
    let rows = document.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++){
        // fetch values for calculations
        let avg_salary = Table.Cell.getValue(rows[i], 'avg-salary');
        let fringe = parseFloat(Table.Cell.getText(rows[i], 'fringe'));
        let baseline_ftes = Table.Cell.getText(rows[i], 'baseline-ftes');

        // calcuate #FTEs x average salary + COLA adjustments + merit adjustments + fringe
        let total_baseline_cost = avg_salary * baseline_ftes * (1 + fringe);

        // update total column
        Table.Cell.updateValue(rows[i], 'total-baseline', total_baseline_cost);
    }

    // Save the table after all updates are done
    Table.save();

}

export function setUpModal() {
    // Initialize modal
    Modal.clear();
    Modal.Link.add('add-btn');
    Modal.Title.update('New job');
}

export function setUpForm() {
    // Set up form
    Form.new('modal-body');
    Form.NewField.shortText('Job Title:', 'job-name', true); 
    Form.NewField.shortText('Account String:', 'account-string', true); 
    Form.NewField.dropdown('Service', 'service', Services.list(), true);
    Form.SubmitButton.add();
    // Initialize form submission to table data
    Modal.Submit.init(handleSubmitNewJob);
}

function handleSubmitNewJob(event){        
    // get answers from form, hide form, show answers in table
    const responses = Form.fetchAllResponses(event);
    // make sure it's not an empty response
    if (Object.values(responses)[0] != ''){
        // change page view
        Modal.hide();

        // add data to table
        Table.Rows.add(responses);
        Table.save();
        initializePersonnelTable();

    }

}
