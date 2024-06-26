import { formatCurrency } from "../../utils/utils.js";
import { TARGET } from "../../init.js";

function hideSidebar(){
    document.getElementById('sidebar-panel').style.display = 'none';
    document.getElementById('main-panel').className = 'col-md-12';
}

function showSidebar(){
    document.getElementById('sidebar-panel').className = 'col-md-2';
    document.getElementById('sidebar-panel').style.display = 'block';
    document.getElementById('main-panel').className = 'col-md-10';
    addTarget(TARGET);
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

const Sidebar = {
    hide: hideSidebar,
    show: showSidebar,
    updateTitle: updateSidebarTitle,
    updateStat: updateSidebarStat,
    incrementStat: incrementSidebarStat,
    addTarget: addTarget
};

export default Sidebar;