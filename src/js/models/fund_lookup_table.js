import CurrentFund from "./current_fund";
import { getUniqueValues } from "../utils/common_utils";

export const FundLookupTable = {
    retrieve : function() {
        return JSON.parse(localStorage.getItem('fund-lookup-table')) || {};
    },
    save : function(fundDict){
        localStorage.setItem('fund-lookup-table', JSON.stringify(fundDict));
    },

    update : function(fundData){
        // reset
        this.reset();
        // fill in with data stored in fundDate
        const table = this.retrieve();
        for (let fund of Object.keys(fundData)){

            // add to lookup table if not in there already
            if (!table[fund]){
                // get fund name
                const fundName = fundData[fund][0]['Fund Name'];
                // add fund to dictionary
                table[fund] = {};
                table[fund]['name'] = fundName;
                table[fund]['viewed'] = false;
                // build lists of unique cost centers and appropriations
                table[fund]['approp'] = getUniqueValues(fundData[fund], 'Appropriation Name');
                table[fund]['cc'] = getUniqueValues(fundData[fund], 'Cost Center Name');
            }
        }
        // save any updates
        this.save(table);
    },

    getAll: function(key) {
        // function to aggregate all approps or CCs for every fund in one array
        const funds = this.retrieve();
        const ret = [];
        for (const fund in funds) {
            if (funds.hasOwnProperty(fund)) {
                for (let i in funds[fund][key]){
                    ret.push(funds[fund][key][i]);
                }
            }
        }
        return ret;
    },

    getCostCenters : function() {
        // get current fund
        const fund = CurrentFund.number()
        if (this.retrieve()[fund]){
            return this.retrieve()[fund]['cc'];
        }
        // if no fund (ie. we're on the new initiative page), return all options
        return this.getAll('cc');
    },

    getApprops : function( extraOption ) {
        // get current fund
        const fund = CurrentFund.number()
        let ret = [];
        if (this.retrieve()[fund]){
            ret = this.retrieve()[fund]['approp'];
        } else {
            // if no fund (ie. we're on the new initiative page), return all options
            ret = this.getAll('approp');
        };
        // add extra option if given
        if (extraOption) {
            ret.push(extraOption);
        }
        return ret;
    },

    reset : function() {
        this.save({});
    },
    getName : function(number){
        if(!number || !this.retrieve()) { return '' };
        return this.retrieve()[number]['name'];
    },
    listFunds : function(){
        return Object.keys(this.retrieve());
    },
    listFundNames : function(){
        const funds = this.retrieve();
        // initialize array
        var ret = [];
        Object.keys(funds).forEach( (fund_number) => {
            var fund_name = funds[fund_number]['name'];
            ret.push(fund_name);
        });
        return ret;
    },
    editFund : function(fund){
        const table = this.retrieve();
        if (table[fund]){
            table[fund]['viewed'] = true;
            this.save(table);
        } else {
            console.error('No fund selected.');
        }
        
    },
    listUneditedFunds : function(){
        const table = this.retrieve();
        const ret = [];
        this.listFunds().forEach(key => {
            if (!table[key]['viewed']){
                ret.push(key);
            }
        });
        return ret;
    },
    fundsLeft : function(){
        return (this.listUneditedFunds().length > 0);
    }
}

export default FundLookupTable