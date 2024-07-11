

import { DATA_ROOT, SHEETS } from '../../init.js';
import FundLookupTable from './budget_data_handlers.js';

export function fetchAndProcessExcel(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer(); // return the ArrayBuffer
        })
        .then(data => {
            try {
                // Read the data into a workbook
                const workbook = XLSX.read(data, { type: 'array' });
                processWorkbook(workbook);
            } catch (err) {
                console.error('Error reading the Excel file:', err);
            }
        })
        .catch(error => {
            console.error('Error fetching the Excel file:', error);
        });
}

function deleteTopRowsUntilFullData(data) {
    // function to try to find the top of the usable data
    let fullDataRowFound = false;

    while (!fullDataRowFound && data.length > 0) {
        const row = data[0]; // Get the top row
        //console.log(row);
        let hasAllData = true;

        for (const cell of row) {
            if (cell == null || cell === '') {
                hasAllData = false;
                break;
            }
        }

        if (hasAllData && row.length > 1) {
            fullDataRowFound = true;
        } else {
            // delete the top row if it's not the header row
            data.shift();
        }
    }

    return data;
}

function processWorkbook(workbook) {
    workbook.SheetNames.forEach(sheetName => {
        // only convert sheets we need
        if (Object.keys(SHEETS).includes(sheetName)) {
             // read in sheets
            const sheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Clean the data by removing top rows with incomplete data
            const dataRows = deleteTopRowsUntilFullData(rawData);

            // get new headers
            const headers = dataRows[0];

            // isolate Fund column to split data
            const fundIndex = headers.indexOf('Fund');
            if (fundIndex === -1) {
                console.error(`No 'Fund' column found in sheet ${sheetName}`);
                return;
            }

            // Save a dictionary of data for each fund for each sheet
            const fundData = {};

            dataRows.forEach(row => {
                const fund = row[fundIndex];
                if(fund && fund != "Fund"){
                    if (!fundData[fund]) {
                        fundData[fund] = [];
                    }
                    const rowData = {};
                    headers.forEach((header, index) => {
                        rowData[header] = row[index];
                    });
                    fundData[fund].push(rowData);
                }
            });

            // save fund number and name as we go along
            FundLookupTable.update(fundData);            

            Object.keys(fundData).forEach(fund => {
                const key = `${SHEETS[sheetName]}-${fund}`;
            // localStorage.setItem(key, JSON.stringify(fundData[fund]));
                console.log(`Data for ${key} saved to localStorage`);
            });
        }
       
    });
}