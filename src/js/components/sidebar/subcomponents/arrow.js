import { CurrentFund, CurrentPage } from "../../../models"

export const Arrow = {
    html : `<div class='arrow' id='menu-arrow'></div>`,
    currentLine() {
        let page = CurrentPage.load();
        let line;
        if (page == 'new-inits'){
            line = document.querySelector('#supp-expenses');
        } else {
            let fund = CurrentFund.number();
            line = document.querySelector(`#fund_${fund} .sidebar-stat-line.${page}`);
        };
        return line;
    },
    mark() {
        let line = this.currentLine();
        const arrow = document.createElement('div');
        arrow.innerHTML = this.html;
        line.appendChild(arrow);
    }
}