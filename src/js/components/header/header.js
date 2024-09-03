import './header.css';

import CurrentFund from '../../models/current_fund';
import { FISCAL_YEAR } from '../../constants';

export const Title = {
    update : function(title){
        document.getElementById("title").textContent = title;
    },
    default() {
        this.update(`FY${FISCAL_YEAR} Budget Request`)
    }
}

export const Subtitle = {
    update : function(subtitle){
        // get current fund
        var fund = CurrentFund.name();
        if (fund){
            var subtitle = `${subtitle}: ${fund}`;
        }
        document.getElementById("subtitle").textContent = subtitle;
    }
}