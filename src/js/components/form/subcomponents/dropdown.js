function createDropdown(dataArray) {

  // Creating a select element
  const selectElement = document.createElement('select');

  // add a default blank option to the dataArray
  dataArray = [''].concat(dataArray);

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
    create : function(dataArray) { return createDropdown(dataArray) },
}

export default Dropdown;