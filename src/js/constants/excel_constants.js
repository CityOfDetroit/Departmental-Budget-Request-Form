// sheets to expect on detail sheet
export const SHEETS = {
    'FTE, Salary-Wage, & Benefits' : 'personnel' ,
    'Overtime & Other Personnel' : 'overtime',
    'Non-Personnel Operating' : 'nonpersonnel',
    'Revenue' : 'revenue'
}

// object categories (from obj part of account string)
export const OBJ_CATEGORIES = {
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

// where to find the general fund target
export const TARGET_CELL_ADDRESS = 'C14'
