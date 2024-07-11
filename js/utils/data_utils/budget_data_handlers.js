export const FundLookupTable = {
    retrieve : function() {
        return JSON.parse(localStorage.getItem('fund-lookup-table')) || {};
    },
    save : function(fundDict){
        localStorage.setItem('fund-lookup-table', JSON.stringify(fundDict));
    },
    update : function(fundData){
        const table = this.retrieve();
        for (const fund of Object.keys(fundData)){
            // add to lookup table if not in there already
            if (!table[fund]){
                // get fund name
                const fundName = fundData[fund][0]['Fund Name'];
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
    }
}

export default FundLookupTable;