// add row button functions

function hideAddButton(){
    document.getElementById('add-btn').style.display = 'none';
}

function showAddButton(){
    document.getElementById('add-btn').style.display = 'block';
}

function updateAddButtonText(text){
    document.getElementById('add-btn').textContent = text;
}

const AddRowButton = {
    hide: hideAddButton,
    show: showAddButton,
    updateText: updateAddButtonText,
};

// other buttons

const Edit = {
    html: '<button class="btn btn-edit">Edit</button>'
};

const Delete = {
    html: '<button class="btn btn-delete">Delete</button>'
};

const Confirm = {
    html: '<button class="btn btn-confrim">Confirm</button>'
};

export const Buttons = {
    Delete: Delete,
    Edit : Edit,
    Confirm : Confirm,
    AddRow : AddRowButton,
    all : function() { Delete.html() + Edit.html() + Confirm.html() }
}

export default Buttons;