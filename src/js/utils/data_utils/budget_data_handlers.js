

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

export const AccountString = {
    getNumber: function(input) {
        // isolate the numerical part of a appropriation/cost center/object
        const match = input.match(/^\d+/);
        return match ? match[0] : null;
    },

    build : function(approp, cc, obj = null, fund = null) {
        // put together account string fund-approp-costcenter[-obj] (w optional object)
        if (!fund) { fund = CurrentFund.number() };
        // hits error here
        approp = this.getNumber(approp);
        cc = this.getNumber(cc);
        var string = `${fund}-${approp}-${cc}`;
        string = obj ? `${string}-${this.getNumber(obj)}` : string;
        return string;
    },

    getAccountStringSection : function(account_string, section) {
        const sections = account_string.split("-");
        return sections.length > section ? sections[section] : null;
    },

    fund : function(account_string) { 
        return this.getAccountStringSection(account_string, 0) 
    },

    approp : function(account_string) { 
        return this.getAccountStringSection(account_string, 1) 
    },

    costCenter : function(account_string) { 
        return this.getAccountStringSection(account_string, 2) 
    },

    object : function(account_string) {
        return this.getAccountStringSection(account_string, 3) 
    },
}