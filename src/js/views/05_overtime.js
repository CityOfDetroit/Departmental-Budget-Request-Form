

import { View, ViewTable } from './view_class.js'
import Table from '../components/table/table.js';
import Form from '../components/form/form.js';

import { FundLookupTable, Services } from '../utils/data_utils/budget_data_handlers.js';
import { unformatCurrency } from '../utils/common_utils.js';

export class OvertimeView extends View {

    constructor() {
        super();
        this.page_state = 'overtime';
        this.prompt = `
            Please see your baseline overtime / holiday pay / shift premiums in the table below.
            Make any edits and continue.`;
        this.subtitle = 'Overtime Estimates';
        this.table = new OvertimeTable();
    }
}

class OvertimeTable extends ViewTable {

    constructor() {
        super();

        // add additional OT columns to the table
        this.columns = this.columns.concat([
            { title: 'Service', className: 'service' },
            { title: 'Recurring or One-Time', className: 'recurring'},
            { title: 'Hourly Employee Overtime (Wages)', className: 'OT-wages', isCost: true },
            { title: 'Salaried Employee Overtime (Salary)', className: 'OT-salary', isCost: true },
            { title: 'Total Cost (including benefits)', className : 'total', isCost: true},
            // hidden columns
            { title: 'FICA Rate', className: 'fica', hide: true},
        ]);

        this.noDataMessage = 'No overtime expenditures for this fund.'
        this.addButtonText = 'Add new cost center' ;
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        Table.Cell.createTextbox('OT-wages', true);
        Table.Cell.createTextbox('OT-salary', true);
        Table.Cell.createServiceDropdown(Services.list());
        Table.Cell.createDropdown('recurring', ['One-Time', 'Recurring']);
    }

    updateTable(){

        function calculateTotalCost(salary, wages, fica_rate){
            fica_rate = parseFloat(fica_rate);
            return (wages + salary) * (1 + fica_rate) ;
        }

        // calculate for each row
        let rows = document.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++){
            // fetch values for calculations
            let OT_salary = Table.Cell.getValue(rows[i], 'OT-salary');
            let OT_wages = Table.Cell.getValue(rows[i], 'OT-wages');
            let fica_rate = Table.Cell.getText(rows[i], 'fica');

            // add salary and wages and fringe benefits (FICA)
            let row_total = calculateTotalCost(OT_salary, OT_wages, fica_rate);

            // update total
            Table.Cell.updateValue(rows[i], 'total', row_total);
        }

        // Save the table after all updates are done
        Table.save();
    }

    addCustomQuestions(){
        // form questions to add a new job
        Form.NewField.dropdown('Appropriation:', 'approp-name', FundLookupTable.getApprops(), true);
        Form.NewField.dropdown('Cost Center:', 'cc-name', FundLookupTable.getCostCenters(), true); 
        Form.NewField.dropdown('Service', 'service', Services.list(), true);
        Form.NewField.dropdown('Recurring or One-Time', 'recurring', ['Recurring', 'One-Time'], true);
        Form.NewField.shortText('Overtime amount requested:', 'OT-wages', true);
    }

    editColumns(responses){
        responses = super.editColumns(responses);
        // edit inputs from modal
        responses['OT-wages'] = unformatCurrency(responses['OT-wages']);
        responses['fica'] = 0.0765;
        return responses;
    }
}

export default OvertimeView;