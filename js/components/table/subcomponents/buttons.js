function hideButton(id){
    return function() {
        document.getElementById(id).style.display = 'none';
    }
}

function showButton(id){
    return function(){
        document.getElementById(id).style.display = '';
    }
}

function updateButtonText(id, text){
    document.getElementById(id).textContent = text;
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

function handleRowEdit(makeRowEditable){
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
            var editButtons = document.getElementsByClassName('btn-edit');
            for (var i = 0; i < editButtons.length; i++) {
                editButtons[i].style.display = 'none';
            }
            initializeConfirmButton(rowToEdit);
    
        });
    };
}

// Confirm button

function initializeConfirmButton(updateCallback){
    // show confirm button
    showButton('btn-confirm');
    // get element and add listener for click
    var rowToEdit = document.querySelector('.active-editing')
    const confirm_btn = rowToEdit.querySelector(".btn-confirm");;
    confirm_btn.addEventListener('click', function(event){;
        // save row edits
        Table.Rows.saveEdits(rowToEdit);
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
    init : function(makeRowEditable){
        handleRowEdit(makeRowEditable)
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
    show: showButton('btn-confirm'),
    init : function(callback){ initializeConfirmButton(callback) }
};

export const Buttons = {
    Delete: Delete,
    Edit : Edit,
    Confirm : Confirm,
    edit_confirm_btns : Edit.html + Confirm.html ,
    all_btns : Delete.html + Edit.html + Confirm.html
}

export default Buttons;