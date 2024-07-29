
import { FundLookupTable } from "../utils/data_utils/budget_data_handlers";

export const CurrentFund = {
    update : function(fund){
        localStorage.setItem('fund', fund);
    },
    number : function(){
        return localStorage.getItem("fund");
    },
    name : function(){
        return FundLookupTable.getName( this.number());
    },
    reset : function() {
        this.update('');
    }
}

export default CurrentFund;