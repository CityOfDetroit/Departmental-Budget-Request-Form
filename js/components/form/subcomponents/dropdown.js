async function createDropdownFromJSON(json_path) {
    // Fetch JSON data from a file asynchronously
    const response = await fetch(json_path);
    const dataArray = await response.json();
  
    // Creating a select element
    const selectElement = document.createElement('select');
  
    // Looping through the array and creating an option for each element
    dataArray.forEach(item => {
      const optionElement = document.createElement('option');
      optionElement.value = item.id; // Setting the option value to the item id
      optionElement.textContent = item.name; // Setting the display text to the item name
      selectElement.appendChild(optionElement); // Appending the option to the select
    });
  
    // Return the select element so it can be appended to the document
    return selectElement;
}

export const Dropdown = {
    createFromJSON : function(json_path){ return createDropdownFromJSON(json_path) }
}

export default Dropdown;