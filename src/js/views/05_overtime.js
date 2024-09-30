

import { View, ViewTable } from './view_class.js'
import Table from '../components/table/table.js';
import Form from '../components/form/form.js';
import { FundLookupTable, Services } from '../models/';
import { unformatCurrency } from '../utils/common_utils.js';
import { OT_OBJECTS } from '../constants/';

export class OvertimeView extends View {

    constructor(fiscal_year) {
        super();
        this.page_state = 'overtime';
        this.prompt = `
            Please see your baseline overtime / holiday pay / shift premiums in the table below.
            Make any edits and continue.`;
        this.subtitle = 'Overtime Estimates';
        this.table = new OvertimeTable(fiscal_year);
    }
}

class OvertimeTable extends ViewTable {

    constructor(fiscal_year) {
        super();

        // add additional OT columns to the table
        this.columns = this.columns.concat([
            { title: 'Service', className: 'service' },
            { title: 'Recurring or One-Time', className: 'recurring'},
            { title: 'Departmental Request OT/SP/Hol', className: 'OT-pay', isCost: true },
            { title: `FY${fiscal_year} Total OT/SP/Hol + FICA Request`, className : 'total', isCost: true},
            { title: 'Object Name', className: 'object-name'},
            { title: 'Departmental Request Notes', className: 'notes'},
            // hidden columns
            { title: 'FICA Rate', className: 'fica', hide: true},
        ]);

        this.noDataMessage = 'No overtime expenditures for this fund.'
        this.addButtonText = 'Add new cost center' ;
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        Table.Cell.createTextbox('OT-pay', true);
        Table.Cell.createServiceDropdown(Services.list());
        Table.Cell.createDropdown('recurring', ['One-Time', 'Recurring']);
        Table.Cell.createDropdown('object-name', OT_OBJECTS);
        Table.Cell.createTextbox('notes', false, 'textarea');
    }

    updateTable(){

        // calculate for each row
        let rows = document.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++){
            // fetch values for calculations
            let OT_salary = Table.Cell.getValue(rows[i], 'OT-pay');
            let fica_rate = Table.Cell.getText(rows[i], 'fica');

            // add salary and wages and fringe benefits (FICA)
            let row_total = OT_salary * (1 + parseFloat(fica_rate));

            // update total
            Table.Cell.updateValue(rows[i], 'total', row_total);
        }

        // Save the table after all updates are done
        Table.save();
    }

    addCustomQuestions(){
        // form questions to add a new job
        Form.NewField.dropdown('Appropriation:', 'approp-name', FundLookupTable.getApprops('Add new'), true);
        Form.NewField.dropdown('Cost Center:', 'cc-name', FundLookupTable.getCostCenters('Add new'), true);
        Form.NewField.dropdown('Object (salary or wage):', 'object-name', OT_OBJECTS, true); 
        Form.NewField.dropdown('Service', 'service', Services.list(), true);
        Form.NewField.dropdown('Recurring or One-Time', 'recurring', ['Recurring', 'One-Time'], true);
        Form.NewField.shortText('Overtime amount requested:', 'OT-pay', true);
    }

    editColumns(responses){
        responses = super.editColumns(responses);
        // edit inputs from modal
        responses['OT-pay'] = unformatCurrency(responses['OT-pay']);
        responses['fica'] = 0.0765;
        return responses;
    }
}

export default OvertimeView;