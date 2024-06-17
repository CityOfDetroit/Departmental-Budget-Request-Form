export function hideModal(modal_id) {
    $('#' + modal_id).modal('hide');
}

export function showModal(modal_id) {
    $('#' + modal_id).modal('show');
}

export function addModalLink(button_id, modal_id){
    document.getElementById(button_id).addEventListener('click', function() {
        showModal(modal_id);
    });
}

export function updateModalTitle(title){
    document.getElementById('modal-title').textContent = title;
}

export function clearModal(){
    updateModalTitle('');
    document.getElementById('modal-body').innerHTML = '';
}