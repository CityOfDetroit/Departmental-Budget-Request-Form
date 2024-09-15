// Import styles
import '../css/common.css';

// Import functions
import CurrentPage from './models/current_page.js';

// Initialize only once when the document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    CurrentPage.visit();
});