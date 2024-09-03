import { View, ViewTable } from './view_class.js'

import Table from '../components/table/table.js';

export class RevenueView extends View {

    constructor(fiscal_year) {
        super();
        this.page_state = 'revenue';
        this.prompt = `Review and edit revenue line items. If you change the estimate or 
            notice an error in an account string, please note it in the notes column. Click edit 
            to change values in a row.`;
        this.subtitle = 'Revenues';
        this.table = new RevenueTable(fiscal_year);
    }
}

class RevenueTable extends ViewTable {

    constructor(fiscal_year) {
        super();

        // add additional revenue columns to the table
        this.columns = this.columns.concat([
            { title: 'Recurring or One-Time', className: 'recurring'},
            { title: 'Object Category', className: 'object-category'},
            { title: `FY${fiscal_year} Departmental Estimate`, className: 'request', isCost: true},
            { title: 'Departmental Estimate Notes', className: 'notes'},
            // hidden
            { title: 'Object Name', className: 'object-name', hide: true},
            { title: 'Object', className: 'object', hide: true},
        ]);

        this.noDataMessage = 'No revenues for this fund.'
    }

    // action on row edit click: make cells editable
    actionOnEdit() { 
        // only allow edits in the notes box
        Table.Cell.createTextbox('notes');
    }
}

export default RevenueView;