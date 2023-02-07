import { actionTypes } from "./actiontypes";




export const fetch_category_currency_request = () => {
    return {
        type: actionTypes.FETCH_CATEGORY_CURRENCY_REQUEST
    }
}
export const fetch_category_currency_success = (item) => {
    return {
        type: actionTypes.FETCH_CATEGORY_CURRENCY_SUCCESS,
        payload: item
    }
}
export const FETCH_CATEGORY_CURRENCY_FAILURE = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORY_CURRENCY_FAILURE,
        payload:error
    }
}


export const addToCart = (item) => {
    return{
        type: actionTypes.ADD_T0_CART,
        payload:item
    }
}

export const categoryFilter = (clickedCategory) => {
    return {
        type: actionTypes.CATEGORY_FILTER,
        payload:clickedCategory
    }
}
export const choosedCurrency = (clickedCurrency) => {
    return {
        type: actionTypes.CHOOSED_CURRENCY,
        payload:clickedCurrency
    }
}

export const increaseCartProductCount = (item) => {
    return {
        type: actionTypes.INCREASE_CART_PRODUCT_COUNT,
        payload: {
            id: item[0],
            Attribute: item[1]
        }
    }
}
export const decreaseCartProductCount = (item) => {
    return {
        type: actionTypes.DECREASE_CART_PRODUCT_COUNT,
        payload: {
            id: item[0],
            Attribute: item[1]
        }
    }
}
export const selectProductOption = (attribute) => {
    return {
        type: actionTypes.SELECT_PRODUCT_OPTIONS_AT_CART,
        payload: {
           id: attribute[0],
           selectedAttrName: attribute[1],
           selectedAttrValue: attribute[2],
           allAttribute: attribute[3]
    }
}
}
 
export const cartPreviousSliderBtn = (changingGallery) => {
    return {
        type: actionTypes.CART_PREVIOUS_SLIDER_BTN,
        payload:changingGallery
}
}
export const cartNextSliderBtn = (changingGallery) => {
    return {
        type: actionTypes.CART_NEXT_SLIDER_BTN,
        payload:changingGallery
    }
}
