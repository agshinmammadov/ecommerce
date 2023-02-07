import { actionTypes } from "../actions/actiontypes";

const defaultCategoryIndex = 0;


export const filterReducer = (state = defaultCategoryIndex, {type, payload}) => {
    switch(type){
        case actionTypes.CATEGORY_FILTER:
            return state = payload
        default:
            return state
    }
}
