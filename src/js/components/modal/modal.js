import './modal.css';

function clearModal(){
    updateModalTitle('');
    document.getElementById('modal-body').innerHTML = '';
    //removeAllModalLinks()
}

function hideModal(modal_id) {
    $('#' + modal_id).modal('hide');
}

function showModal(modal_id) {
    $('#' + modal_id).modal('show');
}

function showModalHandler() {
    showModal('main-modal');
}

const Submit = {
    handler: null, 

    init: function(onSubmit) {
        const modal = document.getElementById('main-modal');
        // add onSubmit function as handler
        this.handler = function(event) {
            event.preventDefault();
            onSubmit(event);
        };
        // Adding the handler reference as the event listener
        modal.addEventListener('submit', this.handler);
    },

    deinit: function() {
        const modal = document.getElementById('main-modal');
        if (this.handler !== null) {
            // Removing the event listener and clear the handler
            modal.removeEventListener('submit', this.handler);
            this.handler = null;
        }
    }
};

const Link = {
    add : function(button_id){
        document.getElementById(button_id).addEventListener('click', showModalHandler)
    },
    remove : function(button_id){
        document.getElementById(button_id).removeEventListener('click', showModalHandler)
    }
}

function updateModalTitle(title) {
    document.getElementById('modal-title').textContent = title;
}

const Title = {
    update : function(title) { updateModalTitle(title) }
}

export const Modal = {
    hide : function() { hideModal('main-modal') },
    show : function() { showModal('main-modal') },
    clear : clearModal,
    Title : Title,
    Link : Link,
    Submit: Submit
}

export default Modal;