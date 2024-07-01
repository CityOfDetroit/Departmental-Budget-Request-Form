import Subtitle from '../../components/header/header.js'
import Prompt from '../../components/prompt/prompt.js'
import NavButtons from '../../components/nav_buttons/nav_buttons.js'
import Body from "../../components/body/body.js";

function initializePageView() {
    // prepare page view
    Body.clearAll();
    NavButtons.show();

    // update page text
    Subtitle.update('Excel Upload');

    // TODO: update to make dynamic
    Prompt.Text.update(`Placeholder for Excel Upload`);
    ///Prompt.Buttons.Right.addAction(initializeWelcomePage)
}
