// function to add questions to forms
// type is 'input' or 'textarea'
// inputType is for validation ('number' or 'text', etc)
function appendFormElement(type, label, inputId, required, inputType, form_id = 'new-form', cost = false) {

    // change if we want forms elsewhere
    const form = document.getElementById(form_id);

    // create outer wrapper for element
    const wrapper = document.createElement('div');  

    // label question
    const labelEl = document.createElement('label');
    labelEl.textContent = label;
  
    // set type (input or textarea)
    let inputEl;
    if (type === 'input') {
      inputEl = document.createElement('input');
      inputEl.type = inputType;
    } else if (type === 'textarea') {
      inputEl = document.createElement('textarea');
    } else {
      throw new Error('Unsupported element type');
    }
  
    // mark as required if applicable
    inputEl.required = required;

    // If an ID is provided, set it on the element
    if (inputId) {
        inputEl.id = inputId;
    }
  
    // add elements
    wrapper.appendChild(labelEl);
    wrapper.appendChild(inputEl);
    form.appendChild(wrapper);
}
  


// Individual functions for each type of input.
export function addTextInput(label, inputId, required = false, form_id = 'new-form', cost = false) {
    appendFormElement('input', label, inputId, required, 'text', form_id);
}
  
export function addNumericInput(label, inputId, required = false, form_id = 'new-form', cost = true) {
    appendFormElement('input', label, inputId, required, 'number', form_id);
}
  
export function addTextarea(label, inputId, required = false, form_id = 'new-form', cost = false) {
    appendFormElement('textarea', label, inputId, required, form_id);
}

export function addSubmitButtonToForm(form_id = 'new-form') {
    // Find the form by its ID
    const form = document.getElementById(form_id);
  
    // Create the container `div` for the button
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'submit-btn-container';
    
    // Create the submit input
    const submitInput = document.createElement('input');
    submitInput.className = 'btn btn-submit'; // Use appropriate class for your design
    submitInput.type = 'submit';
    submitInput.value = 'Submit';

    // Append the submit input to the container
    buttonContainer.appendChild(submitInput);
    
    // Append the container to the form
    form.appendChild(buttonContainer);
}

export function fetchAllResponses(event) {
    event.preventDefault();  // Prevent the default form submission

    // Assuming `event.target` is the form itself
    const form = event.target;
    
    // Initialize an empty array to hold the input values
    let formData = {};
    
    // Loop through each form element
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      
      // Exclude elements that aren't inputs, textareas, or select
      if (element.tagName === 'INPUT' ||
          element.tagName === 'TEXTAREA' ||
          element.tagName === 'SELECT') {
        // Exclude input types that are not considered for submission (such as `submit`)
        if (element.type !== 'submit' && element.type !== 'button') {
          formData[element.id] = element.value;
        }
      }
    }
    
    form.reset();
    return formData;
}

export function addForm(element_id = 'modal-body', form_id = 'new-form') {
  
  const target_elem = document.getElementById(element_id);

  // create form
  const form = document.createElement('form');
  form.setAttribute('id', form_id);

  // Append the form to the modal body
  target_elem.appendChild(form);

}

export async function createDropdownFromJSON(json_path) {
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