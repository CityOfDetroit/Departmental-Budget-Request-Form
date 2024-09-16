// Import styles
import '../css/common.css';

// Import functions
import CurrentPage from './models/current_page.js';

import { getLocalStorageSize } from './utils/storage_utils.js';

// Initialize only once when the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    CurrentPage.visit();
    console.log('Local Storage Used:', getLocalStorageSize());
});