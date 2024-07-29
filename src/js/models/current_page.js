import { visitPage } from "../views/view_logic";

export const CurrentPage = {
    update : function(page){
        localStorage.setItem('page_state', page);
    },
    load : function(){
        const pageState = localStorage.getItem('page_state');
        return pageState !== null ? pageState : 'welcome';
    },
    visit : function(){
        visitPage(this.load());
    }
}

export default CurrentPage;