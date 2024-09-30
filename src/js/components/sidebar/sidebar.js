import { visitPage } from '../../views/view_logic';
import './sidebar.css'
import { BaselineSection } from './subcomponents/baseline_section';
import { Arrow } from './subcomponents/arrow';

import SuppSection from './subcomponents/supp_section'

// fetch CSS variables saved in :root
const root = document.documentElement;
const sideBarWidth = getComputedStyle(root).getPropertyValue('--sidebar-width').trim();

function hideSidebar() {
    document.getElementById('sidebar-panel').style.display = 'none';
    document.getElementById('main-panel').style.width = '100%'; 
    document.querySelector('header').style.width = '100%'

    // remove event listeners
    const btn = document.getElementById('summary-btn-sidebar');
    btn.removeEventListener('click', visitSummary);
    // add event listener to resize content if window is adjusted
    window.removeEventListener('resize', showSidebar);
}

function showSidebar() {
    const sidebar = document.getElementById('sidebar-panel');
    const mainPanel = document.getElementById('main-panel');
    const header = document.querySelector('header');

    // update values
    updateTotals();
    sidebar.style.display = 'block'; // Show the sidebar
    
    // Calculate the remaining width for the main panel and header
    var contentWidth = document.documentElement.clientWidth;
    mainPanel.style.width = `${contentWidth - parseInt(sideBarWidth, 10)}px`; 
    header.style.width = `${contentWidth - parseInt(sideBarWidth, 10)}px`; 

    // enable summary button
    const btn = document.getElementById('summary-btn-sidebar');
    btn.addEventListener('click', visitSummary);
    // add event listener to resize content if window is adjusted
    window.addEventListener('resize', showSidebar);
}

function updateSidebarTitle(new_title){
    document.getElementById('sidebar-title').textContent = new_title;
}

function updateTotals(){
    // get current value
    let value;
    if (Arrow.currentLine()) { 
        value = Arrow.currentLine().querySelector(`.stat`).textContent;
    };
    console.log(value);
    SuppSection.update();
    BaselineSection.update();
    Arrow.mark();
    //if value changed, highlight it
    if (value != Arrow.currentLine().querySelector(`.stat`).textContent){    
        indicateChange();
    }
}

function resetAll(){
    localStorage.clear();
    // reset all stats to 0
    updateTotals();
}

function visitSummary() { visitPage('summary') }

function indicateChange() {
    // get the right color from the root() defined in common.css
    const rootStyle = getComputedStyle(document.documentElement);
    const palegreen = rootStyle.getPropertyValue('--palegreen').trim();
    // identify changed rows = current page and total
    let changedRow = Arrow.currentLine();
    // make any edited rows green
    changedRow.style.backgroundColor = palegreen;
    //totalRow.style.backgroundColor = palegreen;
    // Fade back to default after 0.75 seconds
    setTimeout(() => {
        changedRow.style.backgroundColor = '';
        //totalRow.style.backgroundColor = '';
    }, 750);
}

const Sidebar = {
    SuppSection : SuppSection,
    BaselineSection : BaselineSection,
    Arrow : Arrow,
    hide: hideSidebar,
    show: showSidebar,
    updateTitle: updateSidebarTitle,
    updateTotals: updateTotals,
    reset: resetAll,
};

export default Sidebar;