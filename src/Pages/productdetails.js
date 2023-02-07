import axios from "axios";
import React, { Component } from "react";
import {connect} from 'react-redux';
import "../CSS/productdetails.css";
import { PRODUCT_DETAILS_QUERY } from "../GraphQl/Queries";
import { addToCart } from "../redux/actions/action";


class ProductDetails extends Component{
    constructor(){
        super();        
        this.state = {
            singleProduct:null,
            activeImageindex:0,
            addedProduct:{
                data: null,
                Attribute:[],
                quantity:1,
                productGalleryIndex:0
            }        
        }
    }  
    
    componentDidMount(){
     axios({
            method:'post',
            url:'http://localhost:4000/',
            data: {
                query: PRODUCT_DETAILS_QUERY
            }
        })
        .then((result) =>{
            this.setState({...this.state,
                singleProduct:result.data.data.category.products})
        })
        .catch(error =>{
            console.error(error)})
    }    
    render(){        
        
        //let's find id of clicked product from pathname (last piece of path is our product id)
        if(this.state.singleProduct !== null){
            const pathname = window.location.pathname;
            const productID = pathname.substring(pathname.lastIndexOf('/') + 1);
            const clickedProduct =  this.state.singleProduct !==null && this.state.singleProduct.find(product => product.id === productID); 
            //let's update product data for adding to cart when click add to cart button  
            
            this.state.addedProduct.data = clickedProduct;
            //let's force user to choose product attributes
            const selectedAttributeLength = Object.keys(this.state.addedProduct.Attribute).length;
        
            //Render our clicked product
            const renderClickedProduct = 
            <>
                <div className="product__details_container">
                    <div className="product__small_images">
                        {clickedProduct.gallery.map(image =>
                            <li key={image} title={clickedProduct.name}>
                                <img                             
                                    src={image} 
                                    alt={clickedProduct.name} 
                                    onClick={(e) => 
                                        this.setState({
                                        ...this.state, 
                                        activeImageindex:clickedProduct.gallery.indexOf(e.target.src)
                                    })} //for Rendering of clicked image in big size
                            />
                        </li>
                        )
                    }
                </div>
                <div className ="product__big_image"><img  src ={clickedProduct.gallery[`${this.state.activeImageindex}`] } alt={clickedProduct.name}/></div>
                <div className="product__attributes">
                        <h1 className="pdproduct_brandname">{clickedProduct.brand}</h1>
                        <h2 className="pdproduct_name">{clickedProduct.name}</h2>
                        <div className="product__custom_attribute">
                            {clickedProduct.attributes.map(attr =>
                                <div key={attr.name}>                                                                                  
                                    <h3>{attr.name}:</h3>
                                    {attr.name === "Color" 
                                        ? attr.items.map(custom =>
                                            <button key={custom.value}
                                                name={attr.name} 
                                                onClick={(e) => {
                                                    this.setState(prevState => {
                                                        let alreadySelectedAttr = this.state.addedProduct.Attribute;
                                                        //Let's check for choosing same attribute value
                                                        const sameAttrIndex = alreadySelectedAttr !==null && alreadySelectedAttr.indexOf(alreadySelectedAttr.find(item => item[attr.name]));
                                                        
                                                        if(alreadySelectedAttr ===null){
                                                            return{
                                                                ...prevState,
                                                                addedProduct:{
                                                                    ...prevState.addedProduct,                                                                
                                                                    Attribute:[{[e.target.name]:e.target.value}]
                                                                }
                                                            }}                                                                                                
                                                        else if(sameAttrIndex !== -1){                                                                                                       
                                                            const alreadySelectedAttrCopy = [...alreadySelectedAttr];
                                                            alreadySelectedAttrCopy[sameAttrIndex] = {[e.target.name]:e.target.value}
                                                            return{
                                                                ...prevState,
                                                                addedProduct:{
                                                                    ...prevState.addedProduct,
                                                                    Attribute:alreadySelectedAttrCopy
                                                                }
                                                            }
                                                        }
                                                        else{
                                                            return{
                                                                ...prevState,
                                                                addedProduct:{
                                                                    ...prevState.addedProduct,                                                                
                                                                    Attribute: [...alreadySelectedAttr, {[e.target.name]:e.target.value}]
                                                                }
    
                                                            }
                                                        }
                                                    }
                                                    )
                                                }} 
                                                className = {this.state.addedProduct.Attribute !== [] && 
                                                    this.state.addedProduct.Attribute.find(item => item[attr.name] === custom.displayValue) 
                                                    ? "selected_color_attribute": "color__options"}
                                                style={{backgroundColor:custom.value}} value={custom.displayValue} 
                                            />)
                                        :attr.items.map(custom => 
                                            <button key={custom.value}
                                                name={attr.name}
                                                onClick={(e) => this.setState(prevAttribute => {
                                                    let alreadySelectedAttr = this.state.addedProduct.Attribute;
                                                    //Let's check for choosing same attribute value
                                                    const sameAttrIndex = alreadySelectedAttr !==null && 
                                                        alreadySelectedAttr.indexOf(alreadySelectedAttr.find(item => item[attr.name]));
                                                    
                                                    if(alreadySelectedAttr === null){
                                                        return{
                                                            ...prevAttribute,
                                                            addedProduct:{
                                                                ...prevAttribute.addedProduct,                                                                
                                                                Attribute:[{[e.target.name]:e.target.innerHTML}]
                                                            }
                                                        }}                                                                                                
                                                    else if(sameAttrIndex !== -1){                                                                                                       
                                                        const alreadySelectedAttrCopy = [...alreadySelectedAttr];
                                                        alreadySelectedAttrCopy[sameAttrIndex] = {[e.target.name]:e.target.innerHTML}
                                                        return{
                                                            ...prevAttribute,
                                                            addedProduct:{
                                                                ...prevAttribute.addedProduct,
                                                                Attribute:alreadySelectedAttrCopy
                                                            }
                                                        }
                                                    }
                                                    else{
                                                        return{
                                                            ...prevAttribute,
                                                            addedProduct:{
                                                                ...prevAttribute.addedProduct,                                                                
                                                                Attribute: [...alreadySelectedAttr, {[e.target.name]:e.target.innerHTML}]
                                                            }

                                                        }
                                                    }
                                                    
                                                    }
                                                )}
                                                className = {this.state.addedProduct.Attribute !==[] && 
                                                    this.state.addedProduct.Attribute.find(item => item[attr.name] === custom.value) ? "selected_custom_attribute" : "custom__attr_options"}
                                                >
                                                {custom.value}
                                            </button>)}
                                </div> 
                            )}
                        <div className="pdproduct__price">                            
                            <h5 className="product__attribute_name">PRICE:</h5>
                            {clickedProduct.prices[this.props.activeCurrencyIndex].currency.symbol}{clickedProduct.prices[this.props.activeCurrencyIndex].amount}
                        </div>                
                        </div>
                        <button
                            className="add_to_cart_btn" 
                            onClick={ () =>{if(selectedAttributeLength !== clickedProduct.attributes.length){
                                                return alert("Please select product options first!")
                                            }else{                                               
                                                  this.props.addtoCartHandler(this.state.addedProduct);
                                                  return alert("Product was added to cart successfully")                                                
                                                }
                                            }}  >
                                Add to cart  
                        </button>
                        <div className="product__description">
                            {clickedProduct.description.replace(/(<[^>]+)>/gi, "").trim()}                            
                        </div>
                </div>
            </div>           
           
           </>

            return(
                <>           
                    {renderClickedProduct}
                </>
            )
        }else{
            return <p style={{textAlign: "center"}}>Loading...</p>
        }
        
        
    }
}
const mapStateToProps = (state) => ({
    activeCurrencyIndex: state.choosedCurrencyReducer
})
const mapDispatchToProps = (dispatch) =>({
    addtoCartHandler:(itemName) => dispatch(addToCart(itemName )),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)



