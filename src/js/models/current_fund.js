
import FundLookupTable from "./fund_lookup_table";

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