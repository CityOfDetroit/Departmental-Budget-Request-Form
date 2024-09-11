// import { initializePages } from "../../views/view_logic.js";
// import { fetchJSON } from "./JSON_data_handlers.js";

// function deleteTable(name){
//     localStorage.setItem(name, '');
// }

// export async function deleteAllTables(){
//     var funds = await fetchJSON(DATA_ROOT + 'funds.json');
//     funds = funds.map((item) => { return item.Name });
//     for (const page in initializePages()){
//         for(const i in funds){
//             deleteTable(`${page}_${funds[i]}`);
//         }
//     }
//     deleteTable('new-inits');
// }

