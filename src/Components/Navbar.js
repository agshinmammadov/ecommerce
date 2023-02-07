import React, { Component, createRef } from 'react';
import "../CSS/Navbar.css";
import logo from "../Media/Logo.svg";
import Vector from "../Media/down-vector.svg";
import CartVector from "../Media/cart-icon.svg"
import { CATEGORY_AND_PRICE_NAMES } from "../GraphQl/Queries";
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import { store } from '../redux/store';
import { 
    categoryFilter, 
    choosedCurrency, 
    decreaseCartProductCount, 
    fetch_category_currency_request, 
    fetch_category_currency_success, 
    increaseCartProductCount,
    selectProductOption
    } from '../redux/actions/action';
import { connect } from 'react-redux';
import EmptyCart from './emptycart';
import TotalAmount from './totalamount';
import Currencyicon from './currencyicon';



class Navbar extends Component{
    //After fetching all categories and currencies and save them to redux store
    constructor(props){
        super(props);
        this.state={
            currencySymbol:"$",
            viewAllCurrencies:false,
            viewCartOverlay:false
        }
    }
    currencyContainerRef = createRef();
    cartOverlayRef = createRef();

 
    componentDidMount(){
        store.dispatch(fetch_category_currency_request());
        axios({
            method:'post',
            url:'http://localhost:4000/',
            data: {
                query:  CATEGORY_AND_PRICE_NAMES
            }
        })
        .then(result =>{
            store.dispatch(fetch_category_currency_success(result.data))
        })
        // define clicked area location
        // outside of div or inside of div for managing currency and cartoverlay container
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('mousedown', this.CartOverlayOutSide);
    }
    componentWillUnmount(){
        document
          .removeEventListener('mousedown', this.handleClickOutside);
        document
          .removeEventListener('mousedown', this.CartOverlayOutSide);
      }
      handleClickOutside = (event) => {
        if(
          this.currencyContainerRef.current &&
          !this.currencyContainerRef.current.contains(event.target)
        ){
            this.setState(prevState =>({
                ...prevState,
                viewAllCurrencies: false
            }))
        }
    }

    CartOverlayOutSide = (event) => {
        if(
          this.cartOverlayRef.current &&
          !this.cartOverlayRef.current.contains(event.target)
        ){
            this.setState(prevState =>({
                ...prevState,
                viewCartOverlay: false
            }))
        }
    }


    render(){
        const changeCurrency = (e)=> {
            this.setState({
                ...this.state,
                currencySymbol:e.target.firstChild.data
            });
            this.props.choosedCurrency(this.props.currencies.data.currencies.findIndex(current => current.symbol===e.target.firstChild.data));
        }  
        
        const showHideAllCurrencies = () => {
            this.setState(prevState =>({
                ...prevState,
                viewAllCurrencies:!this.state.viewAllCurrencies        
            }))
        }
        const showHideCartOverlay = () => {
            this.setState(prevState =>({
                ...prevState,
                viewCartOverlay:!this.state.viewCartOverlay
            }))
        }

        //Count of all products in cart
        const AllCartProducts = this.props.productsAtCart;
        const cartProductsCount = this.props.productsAtCart !== null && this.props.productsAtCart.reduce((item, object) => {return item + object.quantity}, 0);


        if(this.props.categories != null){
            return  <nav className='nav'> 
                        <ul className='nav__menu'>
                            {this.props.categories.data.categories.map(item => 
                            <Link key={item.name} to="/">
                                <li
                                    onClick={(e) => this.props.choosedCategory(this.props.categories.data.categories.findIndex(cat => cat.name === e.target.innerHTML))} 
                                    className={this.props.categories.data.categories[this.props.selectedCategoryIndex].name === item.name ? 'nav__menu__items selected_nav_menu' :'nav__menu__items'}>
                                        {item.name}
                                </li>
                            </Link>)}
                        </ul>
                        <div className='nav__logo'>
                            <Link to="/"><img style={{marginRight:"50px"}} src={logo} alt="Logo"/></Link>
                        </div>
                        <div className='nav__icons'>
                            <div className='selected__currency'>
                                {this.state.currencySymbol}
                            </div>
                            <div ref={this.currencyContainerRef} className='nav__icons__dropdown'>
                                <img onClick={showHideAllCurrencies}  src={Vector} className={this.state.viewAllCurrencies !== false ? 'dropdown__vector dropdown__rotate' : 'dropdown__vector'} alt="Dropdown vector" />
                               <div className={this.state.viewAllCurrencies !== false ? 'nav__currency__container show' : 'nav__currency__container hidden'}>
                                    {this.props.currencies.data.currencies.map(item =>  
                                        <div className="nav__currency_items" key={item.symbol}>
                                            <li onClick={changeCurrency}                                                
                                                className='c_items'>
                                                {item.symbol} {item.label}  
                                             </li>
                                        </div>
                                    )}
                                </div>                  
                            </div>
                            <div  className={this.state.viewCartOverlay ? 'mini__cart_shadow show' :'mini__cart_shadow hidden'}></div>
                            <div ref = {this.cartOverlayRef}>
                                    <img className='nav__cart_img' onClick={showHideCartOverlay} src={CartVector} alt="Vector"/>
                                    {this.props.productsAtCart !== null && 
                                        <p className='product__counts_notification'>
                                            {cartProductsCount}
                                        </p>
                                    }
                                    <div 
                                        className={this.state.viewCartOverlay ? 'minicart__overlay show' : 'minicart__overlay hidden'}>
                                        <div className='mini__cart_header'>
                                            {AllCartProducts !== null && <p><strong>My bag, </strong><span> {cartProductsCount} {cartProductsCount === 1 ? "item" : "items"}</span></p>}
                                            {AllCartProducts === null && <EmptyCart/>}
                                        </div>
                                        <div className='mini__cart_section'>
                                            {this.props.productsAtCart !== null && this.props.productsAtCart.map(item =>                                        
                                            <div key={item.data.id} className='mini__cart_body'>                                                
                                                <div className='mini__cart_products'>
                                                    <p className='cartoverlay_brand'>{item.data.brand}</p>
                                                    <p className='cartoverlay__prod_name'>{item.data.name}</p>
                                                    <p className="mini__cart_product__price">{item.data.prices[this.props.activeCurrencyIndex].currency.symbol}{item.data.prices[this.props.activeCurrencyIndex].amount}</p>
                                                    {item.data.attributes.map(attr =>
                                                    <div key={attr.name}>                                                                                 
                                                        <p className="mini__cart_product__attribute_name">{attr.name}:</p>
                                                        {attr.name !== "Color" 
                                                            ? attr.items.map(custom => 
                                                                <button
                                                                    key={custom.value}
                                                                    onClick={(e) => this.props.selectOption([                                                    
                                                                        item.data.id,
                                                                        e.target.name, 
                                                                        e.target.innerHTML,
                                                                        item.Attribute])} //Change custom option in mini cart
                                                                        
                                                                        className={item.Attribute.find(item =>item[attr.name] === custom.value) ? "minicard__custom__attr_options attr__selected" : "minicard__custom__attr_options attr__unselected"}
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
                                                                    ])} //Change color option in mini cart
                                                                    className={item.Attribute.find(item => item[attr.name] === custom.displayValue) ? "minicard__selected__color_options" : "minicard__color__options"}
                                                                    name={attr.name}                                         
                                                                    style={{backgroundColor:custom.value}} value={custom.displayValue} 
                                                                    />)}
                                                    </div>
                                                    )}
                                                </div>                                        
                                                <div className="mini__cart__count_container">
                                                    <div className='cart__count_btns'>
                                                        <button 
                                                            name={item.data.id}
                                                            //Let's define product count which will be increased => it will send product id to payload 
                                                            onClick={(e) => this.props.icreaseCount([e.target.name, item.Attribute])} 
                                                            className="mini__cart__increment_btn">+</button>
                                                        <p>{item.quantity}</p>
                                                        <button  
                                                            name={item.data.id} 
                                                            onClick={(e) =>this.props.decreaseCount([e.target.name, item.Attribute])} 
                                                            className="mini__cart__decrement_btn">-</button>
                                                    </div>
                                                    <div>
                                                        <img style={{height: "190px", width:"121px", objectFit:"cover"}} src={item.data.gallery[item.productGalleryIndex]} alt={item.name} />
                                                    </div>
                                                </div>                                            
                                                
                                                </div>
                                                )}
                                            </div>
                                        {AllCartProducts !== null &&
                                            <>
                                                <div className='cartoverlay_total_container'>
                                                    <span className='cartoverlay_total_text'>Total:</span>
                                                    <span className='cartoverlay_total_amount'><Currencyicon /><TotalAmount /></span> </div>
                                                <div className='mini__cart_btn_container'>
                                                    <Link to="./cart">
                                                        <button className='mini__cart_btn_view'>VIEW BAG</button>
                                                    </Link>
                                                    <button className='mini__cart_btn_checkout'>CHECKOUT</button>
                                                </div>
                                            </>
                                        }                             
                                        </div>
                                    
                                
                            </div>
                        </div>
                    </nav>
        }else {
            return( 
               <p>Loading...</p>
            )
        }
    }
        
    }
    const mapStateToProps = (state) => ({
        selectedCategoryIndex: state.filterReducer,
        categories: state.navMenuReducer.subMenus,
        currencies: state.navMenuReducer.subMenus,
        productsAtCart: state.cartReducer,
        activeCurrencyIndex: state.choosedCurrencyReducer
    })

    const mapDispatchToProps = (dispatch) => ({
        choosedCategory: (clickedCategory) => dispatch(categoryFilter(clickedCategory)),
        choosedCurrency: (clickedCurrency) => dispatch(choosedCurrency(clickedCurrency)),
        icreaseCount:(item) => dispatch(increaseCartProductCount(item)),
        decreaseCount: (item) => dispatch(decreaseCartProductCount(item)), 
        selectOption: (attributeValue) => dispatch(selectProductOption(attributeValue))
    })
    export default connect(mapStateToProps, mapDispatchToProps) (Navbar);

