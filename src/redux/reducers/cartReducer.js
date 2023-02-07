import { actionTypes } from "../actions/actiontypes";


const cart = null;

export  const cartReducer = (state = cart, {type, payload}) => {
    switch(type){
    case actionTypes.ADD_T0_CART:
        if(state === null){
            return state = [payload]
        }else{
            let isExist = false;
            const updatedCart = state.map(item => {
              if (item.data === payload.data && JSON.stringify(item.Attribute) === JSON.stringify(payload.Attribute)) {
                isExist = true;
                return { ...item, quantity: item.quantity + payload.quantity };
              } else {
                return item;
              }
            });
            return isExist ? updatedCart : [...state, payload];
        }
    
        case actionTypes.INCREASE_CART_PRODUCT_COUNT:
                const increasedState = state.map(item => item.data.id === payload.id && 
                    JSON.stringify(item.Attribute) === JSON.stringify(payload.Attribute) ? {...item, quantity:item.quantity + 1} : item)
             return increasedState                
            
        case actionTypes.DECREASE_CART_PRODUCT_COUNT:
                const decreasedQuantyty = state.map(item => item.data.id === payload.id &&
                    JSON.stringify(item.Attribute) === JSON.stringify(payload.Attribute) ? {...item, quantity:item.quantity - 1} : item);  //payload = id of added product              
                const cleanedState = decreasedQuantyty.filter(item => item.quantity !== 0);
                return  cleanedState.length === 0 ? null : cleanedState;
            
        case actionTypes.SELECT_PRODUCT_OPTIONS_AT_CART:
                const copyState = [...state];
                const findProductIndex = copyState.indexOf(state.find(item => item.data.id === payload.id &&
                      JSON.stringify(item.Attribute) === JSON.stringify(payload.allAttribute)));
                      console.log(findProductIndex);
                const selectedAttrIndex = copyState[findProductIndex].Attribute.indexOf(copyState[findProductIndex].Attribute.find(item => item[payload.selectedAttrName]));
                const lastResult = copyState[findProductIndex].Attribute[selectedAttrIndex] = {[payload.selectedAttrName]:payload.selectedAttrValue}
                return copyState               
            
        case actionTypes.CART_NEXT_SLIDER_BTN:
            const changingProduct = state.find(item => item.data.name === payload);                         
                if(changingProduct.productGalleryIndex < changingProduct.data.gallery.length - 1 ) {
                    return state.map(item => item.data.name === payload ? {...item, productGalleryIndex:changingProduct.productGalleryIndex + 1}: item)
                }
        // eslint-disable-next-line no-fallthrough
        case actionTypes.CART_PREVIOUS_SLIDER_BTN:
            const clickedProduct = state.find(item => item.data.name === payload);
                if(clickedProduct.productGalleryIndex > 0){
                    return state.map(item => item.data.name === payload ? {...item, productGalleryIndex:clickedProduct.productGalleryIndex - 1}: item)
                }

        // eslint-disable-next-line no-fallthrough
        default :
            return state
    }
}

