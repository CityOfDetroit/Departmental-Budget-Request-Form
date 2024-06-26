function adjustTableWidth(width_pct){
    const table = document.getElementById('main-table');
    table.style.width = width_pct;
}

function clearTable(){
    const table = document.getElementById('main-table');
    table.querySelector('thead').innerHTML = '';
    table.querySelector('tbody').
    innerHTML = '';
}

function hideTable(){
    const table = document.getElementById('main-table');
    table.style.display = 'none';
    hideAddButton();
}

function showTable(){
    const table = document.getElementById('main-table');
    table.style.display = 'table';
}

const Display = {
    adjustWidth : adjustTableWidth(width_pct),
    clear : clearTable,
    hide : hideTable,
    show : showTable
};

export default Display;