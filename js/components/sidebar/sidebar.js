import { formatCurrency } from "../../utils/common_utils.js";
import { DATA_ROOT, TARGET } from "../../init.js";
import { fetchJSON } from "../../utils/data_utils/JSON_data_handlers.js";
import { Baseline } from "../../utils/data_utils/local_storage_handlers.js";

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

// function updateSidebarStat(stat_id, new_figure){
//     replaceSidebarStat(stat_id, new_figure);
//     updateTotals();
// }

function replaceSidebarStat(stat_id, new_figure){
    const span = document.querySelector(`#${stat_id} .stat`);
    span.setAttribute('value', new_figure);
    span.textContent = formatCurrency(new_figure);
}

// function incrementSidebarStat(stat_id, new_figure){
//     var new_figure = parseFloat(new_figure);
//     if (!isNaN(new_figure)){
//         updateSidebarStat(stat_id, fetchStat(stat_id) + new_figure)
//     }
// }

function fetchStat(stat_id){
    const stat = document.querySelector(`#${stat_id} .stat`);
    return parseFloat(stat.getAttribute('value')) || 0;
}


function addTarget(target){
    replaceSidebarStat('target', target);
}

// update all stats based on saved data
async function updateBaseline(){
    // collect all funds
    var funds = await fetchJSON(DATA_ROOT + 'funds.json');
    funds = funds.map((item) => { return item.Name });
    // gather info and update sidebar accordingly
    var baseline = new Baseline(funds);
    replaceSidebarStat('baseline-revenue', baseline.revenue());
    replaceSidebarStat('baseline-personnel', baseline.personnel());
    replaceSidebarStat('baseline-nonpersonnel', baseline.nonpersonnel());
    replaceSidebarStat('baseline-total', baseline.total());

    // color code based on target
    var target = fetchStat('target');
    if(baseline.total() <= target){
        document.querySelector('#baseline-total .stat').style.color = "green";
    }
    if(baseline.total() > target){
        document.querySelector('#baseline-total .stat').style.color = "red";
    }

}

const Sidebar = {
    hide: hideSidebar,
    show: showSidebar,
    updateTitle: updateSidebarTitle,
    addTarget: addTarget,
    updateTotals: updateBaseline
};

export default Sidebar;