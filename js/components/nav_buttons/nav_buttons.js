export function hideNavButtons() {
    document.getElementById('nav-btns').style.display = 'none';
}

export function showNavButtons() {
    document.getElementById('nav-btns').style.display = 'block';
}

// imputs next and last should be functions to render the appropriate pages
export function updateNavButtonLinks(last, next){
    document.getElementById('btn-last').addEventListener('click', last); 
    document.getElementById('btn-next').addEventListener('click', next); 
}