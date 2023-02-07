import React, { Component } from "react";
import { connect } from "react-redux";

class CurrencyIcon extends Component{
    render(){
        const AllCartProducts = this.props.cartPorducts
        const currencyIcon = AllCartProducts!== null && AllCartProducts[0].data.prices[this.props.activeCurrencyIndex].currency.symbol;        
        return(
            <span>{currencyIcon}</span>
        )
    }
}
const mapStateToProps = (state) => ({
    activeCurrencyIndex: state.choosedCurrencyReducer,
    cartPorducts: state.cartReducer
})

export default connect(mapStateToProps) (CurrencyIcon);
