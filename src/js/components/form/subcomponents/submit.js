function addSubmitButtonToForm(form_id) {
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

export const SubmitButton = {
    add : function() { addSubmitButtonToForm('new-form') }
}

export default SubmitButton;