export function showPrompt(){
    document.getElementById("prompt-div").style.display = "block";
}

export function updatePrompt(prompt){
    document.getElementById('prompt').textContent = prompt;
}

export function updatePromptButtons(option1, option2){
    document.getElementById('option1').textContent = option1;
    document.getElementById('option2').textContent = option2;
}