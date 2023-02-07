import React, { Component } from "react";
import '../CSS/emptycart.css'
class EmptyCart extends Component{
    render(){
        return(
            <h4 className="emptycart__message">Your cart is empty!</h4>
        )
    }
}

export default EmptyCart;