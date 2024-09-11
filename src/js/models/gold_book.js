// the Gold Book contains a lookup table for each job code, which maps to the BU, the job title, and the fringe rate

const GoldBook = {
    init(sheet) {
        const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        localStorage.set('goldbook') = JSON.stringify(rawData);
    },

    fetch(){
        const rawData = localStorage.get('goldbook');
        return JSON.parse(rawData);
    },

    fetchByCode(job_code){
        const full_data = this.fetch();
        return full_data.filter(row => row['Job Code'] === job_code);
    },

    getTitle(job_code){
        const codeData = this.fetchByCode(job_code);
        return codeData['Job Description'];
    }
};

export default GoldBook;