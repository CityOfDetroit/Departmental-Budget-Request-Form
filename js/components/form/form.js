// function to add questions to forms
function appendFormElement(type, label, inputType, inputId, required, cost = false) {

    // change if we want forms elsewhere
    const form = document.getElementById('form-in-modal');

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
export function addTextInput(label, inputId, required = false, cost = false) {
    appendFormElement('input', label, inputId, required, 'text');
}
  
export function addNumericInput(label, inputId, required = false, cost = true) {
    appendFormElement('input', label, inputId, required, 'number');
}
  
export function addTextarea(label, inputId, required = false, cost = false) {
    appendFormElement('textarea', label, inputId, required);
}

export function addSubmitButtonToForm() {
    // Find the form by its ID
    const form = document.getElementById('form-in-modal');
  
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

function getAllInputIds() {
    pass;
}

function fetchAllReponsesOnSubmission(event) {
    event.preventDefault();  // Prevent the default form submission

    // Assuming `event.target` is the form itself
    const form = event.target;
    
    // Initialize an empty array to hold the input values
    let formDataArray = [];
    
    // Loop through each form element
    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      
      // Exclude elements that aren't inputs, textareas, or select
      if (element.tagName === 'INPUT' ||
          element.tagName === 'TEXTAREA' ||
          element.tagName === 'SELECT') {
        // Exclude input types that are not considered for submission (such as `submit`)
        if (element.type !== 'submit' && element.type !== 'button') {
          formDataArray.push(element.value);
        }
      }
    }
    
    form.reset();
    return formDataArray;
}