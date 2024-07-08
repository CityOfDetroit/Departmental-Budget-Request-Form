import { formatCurrency } from "../../utils/common_utils.js";
import { TARGET } from "../../init.js";

// Assuming you have a CSS variable --main-color defined on the :root
const root = document.documentElement;
const sideBarWidth = getComputedStyle(root).getPropertyValue('--sidebar-width').trim();

function hideSidebar() {
    document.getElementById('sidebar-panel').style.display = 'none';
    document.getElementById('main-panel').style.width = '100%'; 
    document.querySelector('header').style.width = '100%'
}

function showSidebar() {
    const sidebar = document.getElementById('sidebar-panel');
    const mainPanel = document.getElementById('main-panel');
    const header = document.querySelector('header');

    sidebar.style.display = 'block'; // Show the sidebar
    
    // Calculate the remaining width for the main panel and header
    var contentWidth = document.documentElement.clientWidth;
    mainPanel.style.width = `${contentWidth - parseInt(sideBarWidth, 10)}px`; 
    header.style.width = `${contentWidth - parseInt(sideBarWidth, 10)}px`; 

    // add target to sidebar
    addTarget(TARGET);

    // add event listener to resize content if window is adjusted
    window.addEventListener('resize', showSidebar);
}


function updateSidebarTitle(new_title){
    document.getElementById('sidebar-title').textContent = new_title;
}

function updateSidebarStat(stat_id, new_figure){
    replaceSidebarStat(stat_id, new_figure);
    // TODO: save in memory
    updateTotals();
}

function replaceSidebarStat(stat_id, new_figure){
    const span = document.querySelector(`#${stat_id} .stat`);
    span.setAttribute('value', new_figure);
    span.textContent = formatCurrency(new_figure);
}

function incrementSidebarStat(stat_id, new_figure){
    var new_figure = parseFloat(new_figure);
    updateSidebarStat(stat_id, fetchStat(stat_id) + new_figure)
}

function fetchStat(stat_id){
    const stat = document.querySelector(`#${stat_id} .stat`);
    return parseFloat(stat.getAttribute('value')) || 0;
}

// Function to update the display of the current and supp variables
function updateTotals() {
    // update bottom lines
    let supp_total =    -fetchStat('supp-revenue') + 
                        fetchStat('supp-personnel') +
                        fetchStat('supp-nonpersonnel');
    let baseline_total = -fetchStat('baseline-revenue') + 
                        fetchStat('baseline-personnel') +
                        fetchStat('baseline-nonpersonnel');
    replaceSidebarStat('supp-total', supp_total);
    replaceSidebarStat('baseline-total', baseline_total);

    // color code based on target
    var target = fetchStat('target');
    if(baseline_total <= target){
        document.querySelector('#baseline-total .stat').style.color = "green";
    }
    if(baseline_total > target){
        document.querySelector('#baseline-total .stat').style.color = "red";
    }
}

function addTarget(target){
    replaceSidebarStat('target', target);
}

function updateTitle(title){
    document.querySelector('#sidebar-title').textContent = title;
}

const Sidebar = {
    hide: hideSidebar,
    show: showSidebar,
    updateTitle: updateSidebarTitle,
    updateStat: updateSidebarStat,
    incrementStat: incrementSidebarStat,
    addTarget: addTarget,
    updateTitle: updateTitle
};

export default Sidebar;