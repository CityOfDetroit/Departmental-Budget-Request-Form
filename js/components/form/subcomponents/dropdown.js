async function createDropdownFromJSON(json_path) {
    // Fetch JSON data from a file asynchronously
    const response = await fetch(json_path);
    const dataArray = await response.json();
    // create and return element
    return createDropdown(dataArray);
}

function createDropdown(dataArray) {

  // Creating a select element
  const selectElement = document.createElement('select');

  // Looping through the array and creating an option for each element
  dataArray.forEach(item => {
    const optionElement = document.createElement('option');
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement); // Appending the option to the select
  });

  // Return the select element so it can be appended to the document
  return selectElement;
}


export const Dropdown = {
    createFromJSON : function(json_path){ return createDropdownFromJSON(json_path) },
    create : function(dataArray) { return createDropdown(dataArray) }
}

export default Dropdown;