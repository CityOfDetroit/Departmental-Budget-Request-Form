import { View, ViewTable } from './view_class.js'
import Form from '../components/form/form.js';
import Table from '../components/table/table.js';
import { FundLookupTable, Services } from '../models/';
import { unformatCurrency } from '../utils/common_utils.js';
import { OBJ_CATEGORIES } from '../constants/';

export class NonPersonnelView extends View {

    constructor(fiscal_year) {
        super();
        this.page_state = 'nonpersonnel';
        this.prompt = `Review and edit non-personnel line items. The CPA numbers are the 
            Contract and Procurement Account numbers. Click on the 'detail' link for a CPA 
            to see the contract details. Some line items won't have a CPA number.`;
        this.subtitle = 'Non-Personnel';
        this.table = new NonPersonnelTable(fiscal_year);
    }
}

class NonPersonnelTable extends ViewTable {

    constructor(fiscal_year) {
        super();

        // add additional personnel columns to the table
        this.columns = this.columns.concat([
            { title: `FY${fiscal_year} Departmental Request Total`, className: 'request', isCost: true },
            { title: 'Service', className : 'service' },
            { title: 'Recurring or One-Time', className: 'recurring'},
            { title: 'Vendor Name', className: 'vendor'},
            { title : 'CPA #', className : 'cpa'},
            // hidden columns
            { title: 'End Date', className: 'contract-end', hide: true},
            { title: 'BPA/CPA Amount Remaining', className: 'remaining', isCost: true , hide: true},
            { title: 'Object Name', className: 'object-name', hide: true},
            { title: 'Object', className: 'object', hide: true},
            { title: 'Object Category', className: 'object-category', hide: true},
            { title: 'BPA/CPA Description', className: 'cpa-description', hide: true} 
        ]);

        this.noDataMessage = 'No non-personnel expenditures for this fund.'
        this.addButtonText = 'Add new non-personnel item' ;
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        Table.Cell.createTextbox('request', true);
        Table.Cell.createServiceDropdown();
        Table.Cell.createDropdown('recurring', ['One-Time', 'Recurring']);
    }

    addCustomQuestions(){
        // form questions to add a new row
        Form.NewField.dropdown('Appropriation:', 'approp-name', FundLookupTable.getApprops(), true);
        Form.NewField.dropdown('Cost Center:', 'cc-name', FundLookupTable.getCostCenters(), true);
        Form.NewField.dropdown('Object Category:', 'object-category', OBJ_CATEGORIES.list, true);
        // TODO: maybe give dropdown based on selected obj category
        Form.NewField.shortText('Object Number (if known):', 'object', false);
        Form.NewField.dropdown('Service', 'service', Services.list(), true);
        Form.NewField.longText('Describe your new request:', 'cpa-description', true);
        Form.NewField.dropdown('Recurring or One-Time', 'recurring', ['Recurring', 'One-Time'], true); 
        Form.NewField.shortText('Amount requested:', 'request', true);
    }

    editColumns(responses){
        responses = super.editColumns(responses);
        responses['avg-salary'] = unformatCurrency(responses['avg-salary']);
        responses['fringe'] = parseFloat(responses['fringe']) / 100;
        return responses;
    }
}

export default NonPersonnelView;