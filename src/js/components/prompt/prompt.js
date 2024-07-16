
import Text from "./subcomponents/text.js";
import Buttons from "./subcomponents/buttons.js";

export const Prompt = {
    Text : Text,
    Buttons : Buttons,
    hide : function(){
        Text.hide();
        Buttons.hide();
    },
    show : function(){
        Text.show();
        Buttons.show();
    }
}

export default Prompt