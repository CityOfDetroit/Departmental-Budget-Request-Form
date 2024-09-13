// the Gold Book contains a lookup table for each job code, which maps to the BU, the job title, and the fringe rate

const GoldBook = {
    init(sheet) {
        // Convert sheet to JSON, with no automatic header row parsing
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        // Assuming header is the second row (index 1), and data starts at the third row (index 2)
        const headers = rawData[1];
        const data = rawData.slice(2); 

        // Store headers and data in localStorage
        localStorage.setItem('goldbook_headers', JSON.stringify(headers));
        localStorage.setItem('goldbook_data', JSON.stringify(data));
    },

    fetch() {
        const headers = JSON.parse(localStorage.getItem('goldbook_headers'));
        const data = JSON.parse(localStorage.getItem('goldbook_data'));
        return { headers, data };
    },

    fetchByCode(job_code) {
        const { headers, data } = this.fetch();

        // Create a map of column names to their respective indices
        const headerMap = headers.reduce((acc, header, index) => {
            acc[header] = index;
            return acc;
        }, {});

        return data.filter(row => row[headerMap['Job Code']] == job_code);
    },

    
    getHeaderIX(header_name){
        const { headers } = this.fetch();
            const headerMap = headers.reduce((acc, header, index) => {
              acc[header] = index;
              return acc;
            }, {});
        return headerMap[header_name];
    },

    lookupByJobCode(job_code, header_name){
        const codeData = this.fetchByCode(job_code);

        if (codeData.length > 0) {
            return codeData[0][this.getHeaderIX(header_name)];
        }
        return null;
    },

    getTitle(job_code) {
        return this.lookupByJobCode(job_code, 'Job Description');
    },


    getFringeRate(job_code) {
        return parseFloat(this.lookupByJobCode(job_code, 'Fringe Rate'));
    },

    codeExists(job_code){
        return !this.lookupByJobCode(job_code);
    }
};

export default GoldBook;