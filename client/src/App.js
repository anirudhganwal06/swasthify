import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// a common css file for entire website
import "./App.css";

// For Private components
import PrivateRoute from "./components/common/PrivateRoute";

// Layout Components
import Header from "./components/layout/header/Header";
import Landing from "./components/layout/landing/Landing";
import Footer from "./components/layout/Footer";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";

// User based components
import Dashboard from "./components/dashboard/Dashboard";

// Products
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/checkout/Checkout";
import MyProfile from "./components/user/MyProfile";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/product/:prodId" component={ProductDetails} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/my-profile" component={MyProfile} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
