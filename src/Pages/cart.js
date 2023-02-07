import React, { Component } from "react";
import { connect } from "react-redux";
import EmptyCart from "../Components/emptycart";
import TotalAmount from "../Components/totalamount";
import '../CSS/cart.css';
import { 
    cartNextSliderBtn, 
    cartPreviousSliderBtn, 
    decreaseCartProductCount, 
    increaseCartProductCount, 
    selectProductOption } from "../redux/actions/action";


class Cart extends Component{
    render(){
        //define all products at cart
        const allCartProducts = this.props.addedproduct;
        
        const renderCartProducts = allCartProducts !== null && allCartProducts.map(item =>
            <div key={Math.random()} className="cart__container">
                <div className="cart__product_left">
                    <h1 className="cart__product_brandname">{item.data.brand}</h1>
                    <h2 className="cart__product_name">{item.data.name}</h2>
                    <p  className="cart__product_price">{item.data.prices[this.props.activeCurrencyIndex].currency.symbol}{item.data.prices[this.props.activeCurrencyIndex].amount}</p>
                    
                        {item.data.attributes.map(attr =>
                                <div key={attr.name}>                                                                                  
                                    <h5 className="product__attribute_name">{attr.name}:</h5>
                                    {attr.name !== "Color" 
                                        ? attr.items.map(custom => 
                                            <button
                                                key={custom.value}
                                                onClick={(e) => this.props.selectOption([                                                    
                                                    item.data.id,
                                                    e.target.name, 
                                                    e.target.innerHTML,
                                                    item.Attribute])} //Change custom option in cart
                                                    
                                                className={item.Attribute.find(item =>item[attr.name] === custom.value) ? "selected__attr_options" : "custom__attr_options"}
                                                name={attr.name}>
                                                {custom.value}
                                            </button>)                                         
                                        
                                        :attr.items.map(custom =>
                                            <button
                                                key={custom.displayValue}
                                                onClick={(e) => this.props.selectOption([
                                                    item.data.id,
                                                    e.target.name,
                                                    e.target.value,
                                                    item.Attribute
                                                    ])} //Change color option in cart
                                                className={item.Attribute.find(item => item[attr.name] === custom.displayValue) ? "selected__color_options" : "color__options"}
                                                name={attr.name}                                         
                                                style={{backgroundColor:custom.value}} value={custom.displayValue} 
                                            />)}
                                    </div>)}
                    
                </div>
                <div className="cart__product_right">
                    <div className="cart__count_container">
                        <button 
                            name={item.data.id}
                            //Let's define product count which will be increased => it will send product id to payload 
                            onClick={(e) => this.props.icreaseCount([e.target.name, item.Attribute])} 
                            className="cart__increment_btn">+</button>
                        <p>{item.quantity}</p>
                        <button  
                            name={item.data.id} 
                            onClick={(e) =>this.props.decreaseCount([e.target.name, item.Attribute])} 
                            className="cart__decrement_btn">-</button>
                    </div> 
                    <div>                        
                        <img style={{height: "288px", width:"200px", objectFit:"cover", objectPosition:"50% 25%"}} src={item.data.gallery[item.productGalleryIndex]} alt={item.name} />                        
                        <input
                            name={item.data.name} 
                            onClick={(e) => 
                                this.props.productPreviousImage(e.target.name)}                          
                            className="previus__btn"  type="button" value="<" />
                        <input 
                            name={item.data.name}
                            onClick={(e) =>                                                              
                                this.props.productNextImage(e.target.name) //send clicked product name to find in cart reducer
                            }
                            className="next__btn"  type="button" value=">" />
                    </div>
                </div>                               
            </div>
        )
        const totalQuantity = allCartProducts !== null && allCartProducts.reduce((item, object) => {return item + object.quantity}, 0);
        const totalAmount = allCartProducts!== null && allCartProducts.reduce((item, object) => {return item + object.data.prices[this.props.activeCurrencyIndex].amount * object.quantity}, 0).toFixed(2);
        const totalAmountCurrency = allCartProducts!== null && allCartProducts[0].data.prices[this.props.activeCurrencyIndex].currency.symbol;        
        const taxAmount = totalAmount !==null && (totalAmount*0.21).toFixed(2);
        return(
            <>
                <h1 className="cart__header">CART</h1>
                {allCartProducts === null && <EmptyCart />}
                {renderCartProducts}
                {allCartProducts !== null && <div className="order__detail_container">
                    <p>Tax 21%: <strong>{totalAmountCurrency}{taxAmount}</strong></p>
                    <p>Quantity: <strong>{totalQuantity}</strong></p>
                    <p>Total: <strong>{totalAmountCurrency}<TotalAmount /></strong></p>
                    <button className="order__submit_btn">Order</button>
                </div>} 
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    addedproduct: state.cartReducer,
    activeCurrencyIndex: state.choosedCurrencyReducer
})
const mapDispatchToProps = (dispatch) => ({
    icreaseCount:(item) => dispatch(increaseCartProductCount(item)),
    decreaseCount: (item) => dispatch(decreaseCartProductCount(item)),
    selectOption: (attribute) => dispatch(selectProductOption(attribute)),
    productNextImage: (selectedProductGallery) => dispatch(cartNextSliderBtn(selectedProductGallery)),
    productPreviousImage: (selectedProductGallery) => dispatch(cartPreviousSliderBtn(selectedProductGallery))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)