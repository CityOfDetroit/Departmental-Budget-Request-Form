import './welcome.css';

// Hide and unhide welcome buttons
function unhideWelcomeButtons(){
    document.getElementById("welcome-page").style.display = "block";
}
function hideWelcomeButtons(){
    document.getElementById("welcome-page").style.display = "none";
}

export const Welcome = {
    show: unhideWelcomeButtons,
    hide : hideWelcomeButtons
}

export default Welcome;