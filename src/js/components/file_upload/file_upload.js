// file_upload.js
import './file_upload.css';
import { processWorkbook } from "../../utils/XLSX_handlers.js";
import NavButtons from '../nav_buttons/nav_buttons.js';

export const FileUpload = {
    init : function() {
        NavButtons.Next.disable();
        const inputObject = document.getElementById('file-input');
        inputObject.addEventListener('change', function(event) { readXL(event) });
    },
    show : function(){
        const inputObject = document.getElementById('file-input');
        inputObject.style.display = '';
    },
    hide : function(){
        const inputObject = document.getElementById('file-input');
        inputObject.style.display = 'none';
    }
};

function readXL(event) {
    const file = event.target.files[0]; // read uploaded file
    const spinner = document.getElementById('upload-spinner'); // get the spinner element

    if (file) {
        // Show the spinner
        spinner.style.display = 'block';

        // read in new data
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;

            try {
                processWorkbook(arrayBuffer);

                // Hide the spinner once processing is done
                spinner.style.display = 'none';
                NavButtons.Next.enable(); // Enable the next button after processing
            } catch (error) {
                console.error('Error processing workbook:', error);

                // Hide the spinner in case of an error
                spinner.style.display = 'none';
                NavButtons.Next.enable(); // Ensure the button is re-enabled in case of an error
            }
        };
        reader.onerror = function(err) {
            console.error('Error reading file:', err);

            // Hide the spinner in case of an error
            spinner.style.display = 'none';
            NavButtons.Next.enable(); // Ensure the button is re-enabled in case of an error
        };

        reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
}

export default FileUpload;