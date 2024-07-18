import './file_upload.css';

import { processWorkbook } from "../../utils/data_utils/XLSX_handlers.js";
import Sidebar from '../sidebar/sidebar.js';

export const FileUpload = {
    init : function() {
        const inputObject = document.getElementById('file-input');
        inputObject.addEventListener('change', function(event) {readXL(event) });
    },
    show : function(){
        const inputObject = document.getElementById('file-input');
        inputObject.style.display = '';
    },
    hide : function(){
        const inputObject = document.getElementById('file-input');
        inputObject.style.display = 'none';
    }
}

function readXL(event) {
    // get file
    const file = event.target.files[0];

    if (file) {
        // delete existing storage
        Sidebar.reset();
        // populate with new Excel data
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            processWorkbook(arrayBuffer);
        };
        reader.onerror = function(err) {
            console.error('Error reading file:', err);
        };
        reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
}