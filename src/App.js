import React, { Component }  from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import Cart from './Pages/cart';
import ProductDetails from './Pages/productdetails';

  export default class App extends Component{
    render(){
      return(
          <>
            <Navbar />
            <Routes>
              <Route exact path='/' element ={<Home />} ></Route>
              <Route  path='/:id' element ={<ProductDetails />} ></Route>
              <Route  path='/cart' element ={<Cart />} ></Route>
            </Routes>
          </>
      )
    }
  }
