import {actionTypes} from "../actions/actiontypes";


const navMenu = {
    subMenus: null,
    loading:false,
    error:null
}

export const navMenuReducer = (state = navMenu, {type, payload}) => {
    switch(type){
        case actionTypes.FETCH_CATEGORY_CURRENCY_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.FETCH_CATEGORY_CURRENCY_SUCCESS:
            return {
                ...state,
                subMenus: payload,
                loading:false,
            }
                
            
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading:false,
                error:payload
            }
        default:
            return state;
    }
}