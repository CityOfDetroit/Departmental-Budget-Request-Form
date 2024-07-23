import './tooltip.css'

export const Tooltip = {
    link : function(element) {
        element.addEventListener('mouseover', function () {
            this.editText('Tooltip');
            this.show();
        });
        element.addEventListener('mouseout', function () {
            this.hide();
        });
    },
    hide : () => {document.getElementById('tooltip').style.visibility = 'hidden';},
    show : () => {document.getElementById('tooltip').style.visibility = 'visible';},
    editText : (newText) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.innerText = newText;
    }
}

export default Tooltip