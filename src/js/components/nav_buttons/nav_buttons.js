// nav_buttons.js
import './nav_buttons.css';
import { nextPage, lastPage, visitPage } from '../../views/view_logic.js';

function initializeNavButtons() {
    // initialize last button
    const last_btn = document.getElementById('btn-last');
    last_btn.addEventListener('click', lastPage); 
    // initialize next button
    const next_btn = document.getElementById('btn-next');
    next_btn.addEventListener('click', nextPage);
}

function disable(button_id) {
    const button = document.getElementById(button_id);
    button.classList.add('disabled');
    button.disabled = true; // Also disable it at the DOM level
}

function enable(button_id) {
    const button = document.getElementById(button_id);
    button.classList.remove('disabled');
    button.disabled = false; // Enable it at the DOM level
}

const Next = {
    disable: function() { disable('btn-next'); },
    enable: function() { enable('btn-next'); },
    addAction: function(fn) {
        document.querySelector(`#btn-next`).addEventListener('click', fn);
    },
    removeAction: function(fn) {
        document.querySelector(`#btn-next`).removeEventListener('click', fn);
    },
    hide() {
        document.querySelector(`#btn-next`).style.display = 'none';
    },
    show() {
        document.querySelector(`#btn-next`).style.display = '';
    }
};

const Last = {
    disable: function() { disable('btn-last'); },
    enable: function() { enable('btn-last'); },
    hide() {
        console.log('hiding')
        document.querySelector(`#btn-last`).style.display = 'none';
    },
    show() {
        console.log('showing')
        console.trace()
        document.querySelector(`#btn-last`).style.display = '';
    }
};

function visitSummaryPage() { visitPage('summary') }

const ReturnToSummary = {
    show: function() { 
        const btn = document.getElementById('return-to-summary')
        btn.style.display = '';
        btn.addEventListener('click', visitSummaryPage);
    },
    hide: function() {
        const btn = document.getElementById('return-to-summary')
        btn.style.display = 'none';
        btn.removeEventListener('click', visitSummaryPage);
    }
};

export const NavButtons = {
    hide: function() {
        Next.hide();
        Last.hide();
    },
    show: function() {
        Next.show();
        Last.show();;
        initializeNavButtons();
    },
    Next: Next,
    Last: Last,
    ReturnToSummary: ReturnToSummary
};

export default NavButtons;