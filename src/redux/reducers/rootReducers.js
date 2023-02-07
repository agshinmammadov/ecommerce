import { combineReducers } from "redux";
import { navMenuReducer } from "./navMenuReducer";
import { cartReducer } from "./cartReducer";
import { filterReducer } from "./filterReducer";
import { choosedCurrencyReducer } from "./choosedCurrencyReducer";


export const rootReducer = combineReducers({
    navMenuReducer,
    cartReducer,
    filterReducer,
    choosedCurrencyReducer
})