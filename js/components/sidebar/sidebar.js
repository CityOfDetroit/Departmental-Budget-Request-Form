export function hideSideBar(){
    document.getElementById('sidebar-panel').className = '';
    document.getElementById('main-panel').className = 'col-md-12';
}

export function showSideBar(){
    document.getElementById('sidebar-panel').className = 'col-md-2';
    document.getElementById('main-panel').className = 'col-md-10';
}

