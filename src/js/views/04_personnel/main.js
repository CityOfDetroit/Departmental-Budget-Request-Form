import { CurrentPage } from "../../utils/data_utils/local_storage_handlers.js";
import { preparePageView, initializePersonnelTable, setUpModal, setUpForm } from "./helpers.js";

import { View, ViewTable } from '../view_class.js'

import Table from "../../components/table/table.js";
import Form from "../../components/form/form.js";

import { Services, FundLookupTable } from "../../utils/data_utils/budget_data_handlers.js";
import { FISCAL_YEAR } from "../../init.js";

import { unformatCurrency } from "../../utils/common_utils.js";

export function loadPersonnelPage(){

    var page = new Personnel();
    page.visit();

}

class Personnel extends View {

    constructor() {
        super();
        this.page_state = 'personnel';
        this.prompt = `
            This table displays the number of FTEs in each job code for in your department's 
            current (amended) FY25 budget. To make edits to the number of positions, click the
            "Edit" button on the row you would like to edit. The "Total Cost" column and the 
            summary sidebar will also update to reflect any edits.`;
        this.subtitle = 'Personnel';
        this.table = new PersonnelTable();
    }
}


class PersonnelTable extends ViewTable {

    constructor() {
        super();

        // add additional revenue columns to the table
        this.columns = this.columns.concat([
            { title: 'Job Title', className: 'job-name' },
            { title: 'Service', className: 'service' },
            { title: `FY${FISCAL_YEAR} Requested FTE`, className: 'baseline-ftes' },
            { title: `FY${FISCAL_YEAR} Average Projected Salary/Wage`, className: 'avg-salary', isCost: true },
            { title: 'Total Cost', className: 'total-baseline', isCost: true },
            // hidden columns
            { title: 'Fringe Benefits Rate', className: 'fringe', hide: true },
            { title: 'General Increase Rate', className: 'general-increase-rate', hide: true},
            { title: 'Step/Merit Increase Rate', className: 'merit-increase-rate', hide: true},
            { title: `Average Salary/Wage as of 9/1/20${FISCAL_YEAR-2}`, className: 'current-salary', isCost: true, hide: true}
        ]);

        this.noDataMessage = 'No personnel expenditures for this fund.'
        this.addButtonText = 'Add new job' ;
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        Table.Cell.createTextbox('baseline-ftes');
        Table.Cell.createServiceDropdown(Services.list());
    }

    updateSidebar(){
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

    addCustomQuestions(){
        // form questions to add a new job
        Form.NewField.shortText('Job Title:', 'job-name', true); 
        Form.NewField.dropdown('Appropriation:', 'approp-name', FundLookupTable.getApprops(), true);
        Form.NewField.dropdown('Cost Center:', 'cc-name', FundLookupTable.getCostCenters(), true);
        Form.NewField.dropdown('Service', 'service', Services.list(), true);
        Form.NewField.shortText('Number of FTEs requested:', 'baseline-ftes', true);
        Form.NewField.shortText(`Projected average salary IN FISCAL YEAR ${FISCAL_YEAR}:`, 'avg-salary', true);
        Form.NewField.shortText(`Expected fringe rate (as a percentage)`, 'fringe', true);
    }

    editColumns(responses){
        // edit inputs from modal
        responses['avg-salary'] = unformatCurrency(responses['avg-salary']);
        responses = super.editColumns(responses);
        responses['fringe'] = parseFloat(responses['fringe']) / 100;
        return responses;
    }
}