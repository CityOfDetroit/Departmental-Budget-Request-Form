import Rows from './rows.js'

function hideButton(className){
    return function() {
        var buttons = document.getElementsByClassName(className);
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = 'none';
        }
    }
}

function showButton(className){
    return function() {
        var buttons = document.getElementsByClassName(className);
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = '';
        }
    }
}

function updateButtonText(className, text){
    document.querySelector(`.${className}`).textContent = text;
}

// button for adding a row

const AddRow = {
    hide: hideButton('btn-add'),
    show: showButton('btn-add'),
    updateText: function(text){
        updateButtonText('btn-add', text);
    }
};

// EDIT button

function handleRowEdit(makeRowEditable, updateCallback){
    // attach an event listener to each edit button in every row
    var editButtons = document.getElementsByClassName('btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', async function(event) {
            // Determine what was clicked on within the table
            var rowToEdit = event.target.closest('tr');
            // mark row as being edited
            rowToEdit.classList.add('active-editing');
            
            // turn relevant entries into textboxes
            makeRowEditable();

            // hide edit buttons
            Edit.hide();
            initializeConfirmButton(updateCallback);
    
        });
    };
}

// Confirm button

function initializeConfirmButton(updateCallback){
    // get element and add listener for click
    var rowToEdit = document.querySelector('.active-editing');
    const confirm_btn = rowToEdit.querySelector(".btn-confirm");
    // show the row's confirm button
    confirm_btn.style.display = 'block';
    confirm_btn.addEventListener('click', function(event){;
        // save row edits
        Rows.saveEdits(rowToEdit);
        // update values in sidebar
        updateCallback();
        // make row no longer green
        rowToEdit.classList.remove('active-editing');
        // show edit buttons and hide confirm buttons
        Edit.show();
        Confirm.hide();
    });
}

const Edit = {
    html: '<button class="btn btn-edit">Edit</button>',
    hide: hideButton('btn-edit'),
    show: showButton('btn-edit'),
    init : function(makeRowEditable, updateCallback){
        handleRowEdit(makeRowEditable, updateCallback)
    }
};

const Delete = {
    html: '<button class="btn btn-delete">Delete</button>',
    hide: hideButton('btn-delete'),
    show: showButton('btn-delete')
};

const Confirm = {
    html: '<button class="btn btn-confirm">Confirm</button>',
    hide: hideButton('btn-confirm'),
    show: showButton('btn-confirm')
};

export const Buttons = {
    Delete: Delete,
    Edit : Edit,
    Confirm : Confirm,
    edit_confirm_btns : Edit.html + Confirm.html ,
    all_btns : Delete.html + Edit.html + Confirm.html
}

export default Buttons;