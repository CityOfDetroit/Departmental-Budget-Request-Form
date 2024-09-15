import { FISCAL_YEAR } from "./budget_constants";

// sheets to expect on detail sheet
export const SHEETS = {
    'FTE, Salary-Wage, & Benefits' : 'personnel' ,
    'Overtime & Other Personnel' : 'overtime',
    'Non-Personnel' : 'nonpersonnel',
    'Revenue' : 'revenue',
    'Initiatives Summary': 'new-inits'
}

// where to find the general fund target
export const TARGET_CELL_ADDRESS = 'C14'

export const TOTAL_COLUMNS = {
    'personnel': 'Total Sal/Wag & Ben Request',
    'overtime':`FY${FISCAL_YEAR} Total OT/SP/Hol + FICA Request`,
    'nonpersonnel': `FY${FISCAL_YEAR} Departmental Request Total`,
    'revenue': `FY${FISCAL_YEAR} Departmental Estimate`,
    'new-inits': `Total Initiative Request`
};
