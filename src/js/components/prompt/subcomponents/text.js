function showPrompt(){
    document.getElementById("prompt-div").style.display = "block";
}

function hidePrompt(){
    document.getElementById('prompt-div').style.display = 'none';
}


function updatePrompt(prompt){
    document.getElementById('prompt').innerHTML = prompt;
    showPrompt();
}

export const Text = {
    show : showPrompt,
    hide : hidePrompt,
    update : function(text) { updatePrompt(text) }
}

export default Text;