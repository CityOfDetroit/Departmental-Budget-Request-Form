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

export const NewField = {
    shortText : function(label, inputId, required = false, form_id = 'new-form', cost = false) {
        appendFormElement('input', label, inputId, required, 'text', form_id);
    },
    longText : function(label, inputId, required = false, form_id = 'new-form', cost = false) {
        appendFormElement('textarea', label, inputId, required, form_id);
    },
    numericInput: function(label, inputId, required = false, form_id = 'new-form', cost = true) {
        appendFormElement('input', label, inputId, required, 'number', form_id);
    }
}

export default NewField;