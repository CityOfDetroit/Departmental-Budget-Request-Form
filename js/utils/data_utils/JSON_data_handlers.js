export async function fetchJSON(jsonFilePath) {
  return fetch(jsonFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export function convertToJSON(table, colsToRemove = []){
    const rows = table.rows;
    // Extract headers from the first row
    const headerRow = rows[0].cells;
    const headers = [];
    for (let j = 0; j < headerRow.length; j++) {
        headers.push(headerRow[j].innerText);
    }

    // initialize data
    var tableData = [];

    for (var i = 1; i < rows.length; i++) {
        const cols = rows[i].cells;
        const rowData = {};
            headers.forEach((header, index) => {
                if (colsToRemove.includes(header)){
                    return;
                }
                else if (cols[index].classList.contains('cost')) {
                    rowData[header] = cols[index].getAttribute('value');
                } else {
                    rowData[header] = cols[index].innerText;
                }
            });
        tableData.push(rowData);
    }
    return JSON.stringify(tableData);
}


  