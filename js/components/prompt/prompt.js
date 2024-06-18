export function showPrompt(){
    document.getElementById("prompt-div").style.display = "block";
}

export function hidePrompt(){
    document.getElementById('prompt-div').style.display = 'none';
}


export function updatePrompt(prompt){
    document.getElementById('prompt').textContent = prompt;
}

export function updatePromptButtons(option1, option2){
    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;
    // make buttons visible
    document.getElementById('option1').style.display = 'inline';
    document.getElementById('option2').style.display = 'inline';
}

export function addPromptButtonAction(button_id, action_fn){
    document.getElementById(button_id).addEventListener('click', action_fn);
}

export function hidePromptButtons(){
    document.getElementById('option1').style.display = 'none';
    document.getElementById('option2').style.display = 'none';
}