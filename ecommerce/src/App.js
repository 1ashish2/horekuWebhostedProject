import './App.css';
import React from 'react';
import {Container} from "react-bootstrap";
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreen from './screens/Homescreen';
import {BrowserRouter as Router,Route, Switch } from "react-router-dom";
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import MainPageScreen from './screens/MainPageScreen';
import ProductFilterScreen from './screens/ProductFilterScreen';
import AboutScreen from './screens/AboutScreen';
import SearchBox from './components/SearchBox';
import MarginalDistanceTop from './components/MarginalDistanceTop';

const  App =()=> {
  return (
    <>
      <Router>
        <Header />
        <div className="d-md-none d-lg-none d-xl-none" style={{marginTop:"80px",padding:"2px 10px"}}>
         
            <Route render={(props) => <SearchBox props={props} />} />
        </div>
        <div className="d-none d-md-block d-lg-block">
          <MarginalDistanceTop />
        </div>
        <main className="py-2">
          <Container >
            <Switch>
              <Route exact path="/" component={MainPageScreen} />
              <Route exact path="/about" component={AboutScreen} />
               <Route exact path="/products/:id" component={ProductFilterScreen} />
              <Route exact path="/search/:keyword" component={Homescreen} />
              <Route exact path="/page/:pageNumber" component={Homescreen} />
              <Route exact path="/search/:keyword/page/:pageNumber" component={Homescreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/shipping" component={ShippingScreen} />
               <Route path="/main" component={MainPageScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/admin/userlist" component={UserListScreen} />
              <Route exact path="/admin/productlist" component={ProductListScreen} />
              <Route exact  path="/admin/productlist/:pageNumber" component={ProductListScreen} />
              <Route path="/admin/orderlist" component={OrderListScreen} />
              <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
               <Route path="/order/:id" component={OrderScreen} />
               <Route path="/payment" component={PaymentScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route  path="/cart/:id?" component={CartScreen} />
            </Switch>
            
      </Container>
        </main>
        <div className="footer px-md-5 px-lg-5">
        <Footer />
        </div>
     
     </Router>
    </>
  );
}

export default App;
