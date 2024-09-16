

import { SHEETS, TARGET_CELL_ADDRESS, FISCAL_YEAR } from '../constants/';
import FundLookupTable from '../models/fund_lookup_table.js';
import { removeNewLines } from './common_utils.js';
import Baseline from '../models/baseline.js';
import Services from '../models/services.js';
import GoldBook from '../models/gold_book.js';


// Helper functions

/**
 * Deletes the top rows until a row containing complete data is found.
 * @param {Array} data - The raw data extracted from the sheet.
 * @returns {Array} - The cleaned data with incomplete top rows removed.
 */
function deleteTopRowsUntilFullData(data) {
    let fullDataRowFound = false;

    while (!fullDataRowFound && data.length > 0) {
        const row = data[0]; // Get the top row
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

/**
 * Reads the workbook from the provided array buffer.
 * @param {ArrayBuffer} arrayBuffer - The array buffer containing the workbook data.
 * @returns {Object} - The parsed workbook.
 */
function readWorkbook(arrayBuffer) {
    return XLSX.read(arrayBuffer, { type: 'array' });
}

/**
 * Processes sheets to be split by fund and saves the relevant data.
 * @param {string} sheetName - The name of the sheet being processed.
 * @param {Object} sheet - The sheet object from the workbook.
 */
function processSheet(sheetName, sheet) {
    // Read in sheets
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    
    // Clean the data by removing top rows with incomplete data
    const dataRows = deleteTopRowsUntilFullData(rawData);

    // Get new headers
    const headers = dataRows[0];
    const fundIndex = headers.indexOf('Fund');
    if (fundIndex === -1) {
        console.error(`No 'Fund' column found in sheet ${sheetName}`);
        return;
    }

    // Save a dictionary of data for each fund for each sheet
    const fundData = {};

    dataRows.forEach(row => {
        const fund = row[fundIndex];
        if(fund && fund !== "Fund"){
            if (!fundData[fund]) {
                fundData[fund] = [];
            }
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[removeNewLines(header)] = row[index];
            });
            fundData[fund].push(rowData);
        }
    });

    // Save fund number and name as we go along
    FundLookupTable.update(fundData);   
    console.log('updating fund lookup table');       

    Object.keys(fundData).forEach(fund => {
        const key = `${SHEETS[sheetName]}_${fund}`;
        localStorage.setItem(key, JSON.stringify(fundData[fund]));
    });
}

/**
 * Processes the 'Drop-Down Menus' sheet to extract services data.
 * @param {Object} sheet - The sheet object from the workbook.
 */
function processDropDownMenusSheet(sheet) {
    const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headerRow = sheetData[0];
    const servicesIndex = headerRow.indexOf('Services');

    if (servicesIndex === -1) {
        console.error('Header "Services" not found');
    } else {
        const servicesColumn = sheetData.slice(1).map(row => row[servicesIndex]);
        const cleanedServicesColumn = servicesColumn.filter(value => value != null);
        Services.save(cleanedServicesColumn);
    }
}

/**
 * Processes the 'Dept Summary' sheet to get and save the target for the general fund.
 * @param {Object} sheet - The sheet object from the workbook.
 */
function processDeptSummarySheet(sheet) {
    if(sheet[TARGET_CELL_ADDRESS]) {
        const cellValue = sheet[TARGET_CELL_ADDRESS].v; // Access the cell value
        localStorage.setItem('target', cellValue);
    } else {
        console.error(`Cell ${TARGET_CELL_ADDRESS} not found`);
    }
}

/**
 * Processes the 'FY{FISCAL_YEAR} Gold Book' sheet to initialize the Gold Book.
 * @param {Object} sheet - The sheet object from the workbook.
 */
function processGoldBookSheet(sheet) {
    GoldBook.init(sheet);
}

function processNewInitsSheet(sheet){
    // Read in sheets
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    
    // Clean the data by removing top rows with incomplete data
    const dataRows = deleteTopRowsUntilFullData(rawData);

    // Get new headers
    const headers = dataRows[0];
    // final data output
    let fullData = []
    
    // Convert data to JSON form and filter out rows where first value is missing
    dataRows.slice(1).forEach(row => { // Skip headers row
        // skip any empty rows at the end
        if ((row[0] != '') && (row[0] != '-')) {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[removeNewLines(header)] = row[index];
            });
            // only keep supplemental initiatives 
            if (rowData['Baseline or Supplemental'].includes('Supplemental')){
                fullData.push(rowData);
            }
        }
    });
    // save in local storage
    localStorage.setItem('new-inits', JSON.stringify(fullData));
}

// Main function to read and process the workbook
export function processWorkbook(arrayBuffer) {
    const workbook = readWorkbook(arrayBuffer);

    workbook.SheetNames.forEach(sheetName => {
        // Only convert sheets we need; treat new inits separately because they shouldn't save by fund
        if (sheetName == Object.keys(SHEETS)[4]) {
            const sheet = workbook.Sheets[sheetName];
            processNewInitsSheet(sheet);
        } else if (Object.keys(SHEETS).includes(sheetName)) {
            const sheet = workbook.Sheets[sheetName];
            processSheet(sheetName, sheet);
        } else if (sheetName === 'Drop-Down Menus') {
            const sheet = workbook.Sheets[sheetName];
            processDropDownMenusSheet(sheet);
        } else if (sheetName === 'Dept Summary') {
            const sheet = workbook.Sheets[sheetName];
            processDeptSummarySheet(sheet);
        } else if (sheetName === `FY${FISCAL_YEAR} Gold Book`) {
            const sheet = workbook.Sheets[sheetName];
            processGoldBookSheet(sheet);
        }
    });

    console.log('all excel data saved');
}

// Utility function to append a sheet to the workbook if data is present
function appendSheetToWorkbook(workbook, data, sheetName) {
    if (data.length > 0) {
        const sheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    }
}

export function downloadXLSX() {
    // grab data from baseline object
    const baseline = new Baseline();
    const workbook = XLSX.utils.book_new(); // Create a new workbook

    // Initialize sheet data based on the names of each tab in the Excel doc
    const sheetData = Object.keys(SHEETS).reduce((acc, key) => {
        acc[key] = [];
        return acc;
    }, {});

    // Aggregate all rows across funds and combine for each tab
    baseline.funds.forEach(fund => {
        Object.keys(SHEETS).forEach(sheetName => {
            if (fund[SHEETS[sheetName]] && fund[SHEETS[sheetName]].table) {
                sheetData[sheetName].push(...fund[SHEETS[sheetName]].table);
            }
        });
    });

    // Add initiatives data (which isn't stored by fund)
    sheetData[Object.keys(SHEETS)[4]] = JSON.parse(localStorage.getItem('new-inits'));

    // Create a tab for each table
    Object.keys(sheetData).forEach(sheetName => {
        appendSheetToWorkbook(workbook, sheetData[sheetName], sheetName);
    });

    // Generate a downloadable file
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Create a link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Filled_Detail_Sheet.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function excelSerialDateToJSDate(serial) {

    if (!serial) { return null };
    // Excel considers 1900-01-01 as day 1, but JavaScript's Date considers
    // 1970-01-01 as day 0. Therefore, we calculate the number of milliseconds
    // between 1900-01-01 and 1970-01-01.
    const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // JavaScript Consider December month as '11'
    
    // Calculate the JS date by adding serial days to the epoch date
    const date = new Date(excelEpoch.getTime() + (serial * 24 * 60 * 60 * 1000));
    
    // Set the time part to zero (midnight)
    date.setUTCHours(0, 0, 0, 0);
    
    // Return the date part of the ISO string
    return date.toISOString().split('T')[0];
}
