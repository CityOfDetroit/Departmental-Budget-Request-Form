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
            // fund = toString(fund);
            // add to lookup table if not in there already
            if (!table[fund]){
                // get fund name
                const fundName = fundData[fund][0]['Fund Name'];
                console.log(fundName);
                // add fund to dictionary
                table[fund] = fundName;
            }
        }
        // save any updates
        this.save(table);
    },
    reset : function() {
        this.save({});
    },
    getName : function(number){
        return this.retrieve()[number];
    },
    listFunds : function(){
        return Object.keys(this.retrieve());
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