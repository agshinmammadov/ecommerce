import React, { Component } from "react";
import { connect } from "react-redux";

class TotalAmount extends Component{
    render(){
        const AllCartProducts = this.props.cartPorducts
        const totalAmount = AllCartProducts!== null && AllCartProducts.reduce((item, object) => {return item + object.data.prices[this.props.activeCurrencyIndex].amount * object.quantity}, 0).toFixed(2)
        return(
            <span>{totalAmount}</span>
        )
    }
}
const mapStateToProps = (state) => ({
    activeCurrencyIndex: state.choosedCurrencyReducer,
    cartPorducts: state.cartReducer
})

export default connect(mapStateToProps) (TotalAmount);

