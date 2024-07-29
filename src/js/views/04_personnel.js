import { View, ViewTable } from './view_class.js'

import Table from "../components/table/table.js";
import Form from "../components/form/form.js";

import Services from '../models/services.js';
import FundLookupTable from '../models/fund_lookup_table.js';
import { unformatCurrency } from "../utils/common_utils.js";

export class PersonnelView extends View {

    constructor(fiscal_year) {
        super();
        this.page_state = 'personnel';
        this.prompt = `
            This table displays the number of FTEs in each job code for in your department's 
            current (amended) FY25 budget. To make edits to the number of positions, click the
            "Edit" button on the row you would like to edit. The "Total Cost" column and the 
            summary sidebar will also update to reflect any edits.`;
        this.subtitle = 'Personnel';
        this.table = new PersonnelTable(fiscal_year);
    }
}


class PersonnelTable extends ViewTable {

    constructor(fiscal_year) {
        super();
        this.fiscal_year = fiscal_year;
        // add additional personnel columns to the table
        this.columns = this.columns.concat([
            { title: 'Job Title', className: 'job-name' },
            { title: 'Service', className: 'service' },
            { title: `FY${this.fiscal_year} Requested FTE`, className: 'baseline-ftes' },
            { title: `FY${this.fiscal_year} Average Projected Salary/Wage`, className: 'avg-salary', isCost: true },
            { title: 'Total Cost', className: 'total-baseline', isCost: true },
            // hidden columns
            { title: 'Fringe Benefits Rate', className: 'fringe', hide: true },
            { title: 'General Increase Rate', className: 'general-increase-rate', hide: true},
            { title: 'Step/Merit Increase Rate', className: 'merit-increase-rate', hide: true},
            { title: `Average Salary/Wage as of 9/1/20${this.fiscal_year-2}`, className: 'current-salary', isCost: true, hide: true}
        ]);

        this.noDataMessage = 'No personnel expenditures for this fund.'
        this.addButtonText = 'Add new job' ;
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        Table.Cell.createTextbox('baseline-ftes');
        Table.Cell.createServiceDropdown(Services.list());
    }

    updateTable(){
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
        Form.NewField.shortText(`Projected average salary IN FISCAL YEAR ${this.fiscal_year}:`, 'avg-salary', true);
        Form.NewField.shortText(`Expected fringe rate (as a percentage)`, 'fringe', true);
    }

    editColumns(responses){
        responses = super.editColumns(responses);
        // edit inputs from modal
        responses['avg-salary'] = unformatCurrency(responses['avg-salary']);
        responses['fringe'] = parseFloat(responses['fringe']) / 100;
        return responses;
    }
}

export default PersonnelView;