import './header.css';

import CurrentFund from '../../models/current_fund';

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

export default Subtitle;