
// data structure to hold information on new initiatives

import { NEW_INIT_COLS } from "../constants";
import { cleanString } from "../utils/common_utils";

export class Initiative {
    
    constructor(row) {
        this.data = row;
        this.name = row[NEW_INIT_COLS['name']];
    }

    id() {
        let hash = 5381;
        for (let i = 0; i < this.name.length; i++) {
            hash = (hash << 5) + hash + this.name.charCodeAt(i);  // hash * 33 + c
        }
        return hash >>> 0;  // Ensure positive unsigned 32-bit integer
    }

    personnel() { 
        if (this.data[NEW_INIT_COLS['personnel']]) {
            return this.data[NEW_INIT_COLS['personnel']];
        } else {
            return 0;
        }
    }

    operating() { 
        if (this.data[NEW_INIT_COLS['operating']]) {
            return this.data[NEW_INIT_COLS['operating']];
        } else {
            return 0;
        }
    }

    capital() { 
        if (this.data[NEW_INIT_COLS['capital']]) {
            return this.data[NEW_INIT_COLS['capital']];
        } else {
            return 0;
        }
    }

    revenue() { 
        if (this.data[NEW_INIT_COLS['revenue']]) {
            return this.data[NEW_INIT_COLS['revenue']];
        } else {
            return 0;
        }
    }

    total() { 
        if (this.data[NEW_INIT_COLS['total']]) {
            return this.data[NEW_INIT_COLS['total']];
        } else {
            return 0;
        }
    }

}

export default Initiative;