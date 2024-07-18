function showPromptButton(id){
    // make buttons visible
    document.getElementById(id).style.display = 'inline';
}

function updatePromptButton(id, text){
    document.getElementById(id).textContent = text;
    showPromptButton(id);
}

function hidePromptButton(id){
    document.getElementById(id).style.display = 'none';
}

function unclickAll(){
    document.getElementById('option1').classList.remove('clicked');
    document.getElementById('option2').classList.remove('clicked');
}

function applyClickedStyle(button){
    unclickAll();
    button.classList.add('clicked');
}

function addPromptButtonAction(button_id, action_fn){
    const buttonElement = document.getElementById(button_id);
    buttonElement.addEventListener('click', action_fn);
    buttonElement.addEventListener('click', function(){
        applyClickedStyle(this);
    });
}

function removePromptButtonAction(button_id, action_fn){
    document.getElementById(button_id).removeEventListener('click', action_fn);
}

function disable(button_id){
    document.querySelector(`#${button_id}`).classList.add('disabled');
}

function enable(button_id){
    document.querySelector(`#${button_id}`).classList.remove('disabled');
}

export const Left = {
    show : function() { showPromptButton('option1') },
    hide : function() { hidePromptButton('option1') },
    updateText : function(text) { updatePromptButton('option1', text) },
    addAction : function(action_fn) { addPromptButtonAction('option1', action_fn) },
    removeAction : function(action_fn) { removePromptButtonAction('option1', action_fn) },
    disable : function() { disable('option1') },
    enable : function() { enable('option1') }
}

export const Right = {
    show : function() { showPromptButton('option2') },
    hide : function() { hidePromptButton('option2') },
    updateText : function(text) { updatePromptButton('option2', text) },
    addAction : function(action_fn) { addPromptButtonAction('option2', action_fn) },
    removeAction : function(action_fn) { removePromptButtonAction('option2', action_fn) },
    disable : function() { disable('option2') },
    enable : function() { enable('option2') }
}

export const Buttons = {
    Left : Left,
    Right : Right,
    show : function() {
        showPromptButton('option1');
        showPromptButton('option2');
    },
    hide : function() {
        hidePromptButton('option1');
        hidePromptButton('option2');
    },
    reset : unclickAll
}

export default Buttons;