import { CurrentFund } from "./local_storage_handlers";

function getUniqueValues(data, key) {
    const values = data.map(obj => obj[key]);
    return Array.from(new Set(values));
}

export const FundLookupTable = {
    retrieve : function() {
        return JSON.parse(localStorage.getItem('fund-lookup-table')) || {};
    },
    save : function(fundDict){
        localStorage.setItem('fund-lookup-table', JSON.stringify(fundDict));
    },

    update : function(fundData){
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

    getCostCenters : function() {
        // get current fund
        const fund = CurrentFund.number()
        if (this.retrieve()[fund]){
            return this.retrieve()[fund]['cc'];
        }
        return [];
    },

    getApprops : function() {
        // get current fund
        const fund = CurrentFund.number()
        if (this.retrieve()[fund]){
            return this.retrieve()[fund]['approp'];
        }
        return [];
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

// data structure to save the possible service options for the department
export const Services = {
    save : function(services){
        localStorage.setItem('services-list', JSON.stringify(services));
    },
    list : function(){
        return JSON.parse(localStorage.getItem('services-list')) || {};
    }
}

export const ObjectCategories = {
    list : [
        // 'Salaries & Wages',
        // 'Employee Benefits',
        'Professional & Contractual Services',
        'Operating Supplies',
        'Operating Services',
        'Equipment Acquisition',
        'Capital Outlays',
        'Fixed Charges',
        'Other Expenses'
    ]
}

function getNumber(input) {
    const match = input.match(/^\d+/);
    return match ? match[0] : null;
}

export const AccountString = {
    build : (approp, cc, obj = null) => {
        // put together account string fund-approp-costcenter[-obj] (w optional object)
        const fund = CurrentFund.number();
        approp = getNumber(approp);
        cc = getNumber(cc);
        var string = `${fund}-${approp}-${cc}`;
        string = obj ? `${string}-${getNumber(obj)}` : string;
        return string;
    },

    getAccountStringSection : (account_string, section) => {
        const sections = account_string.split("-");
        return sections.length > section ? sections[section] : null;
    },

    fund : (account_string) => { this.getAccountStringSection(account_string, 0) },

    approp : (account_string) => { this.getAccountStringSection(account_string, 1) },

    costCenter : (account_string) => { this.getAccountStringSection(account_string, 2) },

    object : (account_string) => { this.getAccountStringSection(account_string, 3) },
}