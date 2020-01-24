import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// a common css file for entire website
import "./App.css";

// For Private components
import PrivateRoute from "./components/common/PrivateRoute";

// Layout Components
import Header from "./components/layout/header/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";

// User based components
import MyProfile from "./components/user/MyProfile";
import Wishlist from "./components/user/Wishlist";
import OrdersList from "./components/user/OrdersList";
import Checkout from "./components/checkout/Checkout";
import AddAddress from "./components/user/AddAddress";

// Products
import ProductDetails from "./components/products/ProductDetails";
import ProductList from "./components/products/ProductList";

// Pages
import AboutUs from "./components/pages/AboutUs";

// Loading
// import loading from "./components/common/Loading";

// Flash Message
import FlashMessage from "./components/common/FlashMessage";

// Error
import Error from "./components/error/Error";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <FlashMessage />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/logout" component={Logout} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/product/:prodId" component={ProductDetails} />
              <PrivateRoute exact path="/checkout" component={Checkout} />
              <PrivateRoute exact path="/my-profile" component={MyProfile} />
              <PrivateRoute exact path="/wishlist" component={Wishlist} />
              <PrivateRoute exact path="/orders" component={OrdersList} />
              <PrivateRoute exact path="/address/add" component={AddAddress} />
              <PrivateRoute
                exact
                path="/address/:index/edit"
                component={props => <AddAddress editMode={true} {...props} />}
              />
              <Route exact path="/about-us" component={AboutUs} />
              <Route exact path="/orders" component={OrdersList} />
              <Route path="*" component={() => <Error statusCode="404" />} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
