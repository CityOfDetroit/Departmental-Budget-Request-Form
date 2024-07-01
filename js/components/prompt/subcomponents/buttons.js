function showPromptButton(id){
    // make buttons visible
    document.getElementById(id).style.display = 'inline';
}

function updatePromptButton(id, text){
    document.getElementById(id).textContent = text;
    showPromptButton(id);
}

function addPromptButtonAction(button_id, action_fn){
    document.getElementById(button_id).addEventListener('click', action_fn);
}

function hidePromptButton(id){
    document.getElementById(id).style.display = 'none';
}

export const Left = {
    show : showPromptButton('option1'),
    hide : hidePromptButton('option1'),
    updateText : function(text) { updatePromptButton('option1', text) },
    addAction : function(action_fn) { addPromptButtonAction('option1', action_fn) }
}

export const Right = {
    show : showPromptButton('option2'),
    hide : hidePromptButton('option2'),
    updateText : function(text) { updatePromptButton('option2', text) },
    addAction : function(action_fn) { addPromptButtonAction('option2', action_fn) }
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
    }
}

export default Buttons;