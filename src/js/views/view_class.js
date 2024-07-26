import Prompt from "../components/prompt/prompt.js";
import Sidebar from "../components/sidebar/sidebar.js";
import NavButtons from "../components/nav_buttons/nav_buttons.js";
import Body from "../components/body/body.js";
import Subtitle from "../components/header/header.js";
import Table from "../components/table/table.js";
import Form from "../components/form/form.js";
import Modal from "../components/modal/modal.js";
import Sidebar from "../components/sidebar/sidebar.js";

export class View {
    constructor(page_state) {
        this.page_state = page_state
    }

    navButtons() { return true }

    sidebar() { return true }

    form() { return null }

    prompt() { return '' }

    table() { return new ViewTable() }

    subtitle() { return '' }

    visit() {
        // update page state
        CurrentPage.update(this.page_state);

        // start with a blank page
        Body.reset();
        
        // default to showing navbuttons
        if (this.navButtons()) { NavButtons.show(); };
        
        // default to showing sidebar
        if (this.sidebar()) { Sidebar.show() };

        // initialize prompt text and buttons
        if (this.prompt()) { Prompt.Text.update(this.prompt()) };
        
        // initialize table
        if (this.table()) { this.table(); }

        // show page subtitle
        if (this.subtitle()) { Subtitle.update(this.subtitle()) };
    }

    cleanup() { return }

}

export class ViewTable {

    constructor(){
        // build out table from local storage
        this.build();

        // add the add new row button if needed
        if (this.addButtonText()) { 
            this.setUpForm();
        }
    }

    columns() {
        // common columns in every table
        const cols = [
            { title: 'Account String', className: 'account-string' },
            { title: 'Appropriation Name', className: 'approp-name', hide: true },
            { title: 'Appropriation', className: 'approp', hide: true },
            { title: 'Cost Center Name', className: 'cc-name',  hide: true },
            { title: 'Cost Center', className: 'cc',  hide: true },
            { title: 'Fund Name', className: 'fund-name',  hide: true },
            { title: 'Fund', className: 'fund',  hide: true },
            { title: 'Edit', className: 'edit' },
        ];
        return cols;
    }

    async build() {
    // build table from local storage and initialize edit buttons

        if(await Table.Data.load()) {

            //after table is loaded, show it
            Table.show();

            // add an edit column if needed
            if (this.addEdit()) { 
                Table.Columns.addAtEnd(Table.Buttons.edit_confirm_btns, 'Edit'); 
                // activate edit buttons
                Table.Buttons.Edit.init(this.actionOnEdit, this.updateSidebar);
            }
            
            // assign the correct classes based on the table columns
            Table.Columns.assignClasses(this.columns());

            // Apply any update function to make sure sidebar is up to date
            this.updateSidebar();

        } else {

            // show a message if there's no saved table data for the selected fund
            if (noDataMessage()) {
                Prompt.Text.update(noDataMessage());
            }
        }
    }

    // placeholder for action on row edit click
    actionOnEdit() { return }

    // whether to add an edit column
    addEdit() { return true };

    // update function for the sidebar; default to just saving the table
    updateSidebar() { Table.save() }

    // message to show if there's no saved data
    noDataMessage() { return null };

    // text to show for new row button
    addButtonText() { return null };

    addCustomQuestions() { return };

    setUpForm() {
        // set up modal for form when add button is pressed
        Modal.clear();
        Modal.Link.add('add-btn');
        Modal.Title.update(addButtonText());

        // create form
        Form.new('modal-body');
        Form.SubmitButton.add();

        // add custom questions
        this.addCustomQuestions();

        // Initialize form submission to table data
        Modal.Submit.init(this.submitNewRow);
    }

    submitNewRow(event) {
        // get answers from form, hide form, show answers in table
        const responses = Form.fetchAllResponses(event);
        
        // edit inputs from modal
        responses = editColumns(responses);
        
        // make sure it's not an empty response
        if (Object.values(responses)[0] != ''){

            // change page view
            Modal.hide();
            
            // add data to table
            Table.Rows.add(responses);
            Table.save();
            
            // rebuild table
            this.build();
        }
    }

}