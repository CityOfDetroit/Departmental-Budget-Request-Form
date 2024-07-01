
function clearModal(){
    updateModalTitle('');
    document.getElementById('modal-body').innerHTML = '';
    //removeAllModalLinks()
}

// function removeAllModalLinks(){
//     TODO
// }

function hideModal(modal_id) {
    $('#' + modal_id).modal('hide');
}

function showModal(modal_id) {
    $('#' + modal_id).modal('show');
}

function showModalHandler() {
    showModal('main-modal');
}

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
    Link : Link
}

export default Modal;