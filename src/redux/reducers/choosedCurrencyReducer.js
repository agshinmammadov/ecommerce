import { actionTypes } from "../actions/actiontypes";

const defaultCurrencyIndex = 0;

export const choosedCurrencyReducer = (state =defaultCurrencyIndex, {type, payload}) =>{
    switch(type){
        case actionTypes.CHOOSED_CURRENCY:
            return state = payload
        default:
            return state
    }
}