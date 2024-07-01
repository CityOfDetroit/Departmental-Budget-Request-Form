import Dropdown from "./subcomponents/dropdown.js";
import NewField from "./subcomponents/fields.js";
import SubmitButton from "./subcomponents/submit.js";

function fetchAllResponses(event) {
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

function addForm(element_id = 'modal-body', form_id = 'new-form') {
  
  const target_elem = document.getElementById(element_id);

  // create form
  const form = document.createElement('form');
  form.setAttribute('id', form_id);

  // Append the form to the modal body
  target_elem.appendChild(form);

}

export const Form = {
  new : function(parent_elem_id) { addForm(parent_elem_id, 'new-form') },
  fetchAllResponses : function(event) { fetchAllResponses(event) },
  NewField : NewField,
  Dropdown : Dropdown,
  SubmitButton : SubmitButton
}

export default Form;