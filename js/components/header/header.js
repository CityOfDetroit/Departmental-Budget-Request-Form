export const Subtitle = {
    update : function(subtitle){
        // get current fund
        var fund = localStorage.getItem("fund");
        if (fund){
            var subtitle = `${subtitle}: ${fund}`;
        }
        document.getElementById("subtitle").textContent = subtitle;
    }
}

export default Subtitle;