import axios from 'axios';
import ProductCart from "../Media/white-cart-icon.svg"
import {Link} from "react-router-dom";
import '../CSS/home.css';
import { ALL_PRODUCTS_DATA_QUERY } from '../GraphQl/Queries';
import { Component } from 'react';
import { connect } from 'react-redux';


 class Home extends Component{
   state = {data: null}
    componentDidMount(){
         axios({
            method:'post',
            url:'http://localhost:4000/',
            data: {
                query:ALL_PRODUCTS_DATA_QUERY
            }
        })
        .then((result) =>{
            this.setState({data:result.data.data});
        })
    }
     

    render(){
        const {data} = this.state;
        if(data !== null){
            let Filtering = data.categories[this.props.activeCategoryIndex]
            return(
                <>
                    <h1 className='category__header'>{Filtering.name}</h1>
                    <section className='product__list_container'>
                        {Filtering.products.map(product =>
                            <div key={product.id} className={`${product.inStock ? "product__card" : "product__card__out__of_Stock"}`}>
                                <h1 className= {`${product.inStock ? "turnOFF__stock_message" : "turnON__stock_message"}`}>
                                    OUT OF STOCK
                                </h1>
                                <Link to={`${product.id}`}>
                                    <img src={product.gallery[0]} className='product__images' alt="Product thumbnail" />
                                    <div className='product__cart__icon'>
                                        <img  src={ProductCart} alt="Cart"/>
                                    </div>
                                    <p className='product__name'>{product.brand} {product.name}</p>
                                    <p className='product__price'>{product.prices[this.props.activeCurrencyIndex].currency.symbol}{product.prices[this.props.activeCurrencyIndex].amount}</p>
                                </Link>
                            </div>)}
                    </section>
                </>
            )}else{ 
                return(
                <p style={{textAlign:"center"}}>Loading...</p>
                )
             }
    }
          
}

const mapStateToProps = (state) =>({
    activeCategoryIndex: state.filterReducer,
    activeCurrencyIndex: state.choosedCurrencyReducer
})

export default connect (mapStateToProps)(Home)
