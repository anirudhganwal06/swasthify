import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// a common css file for entire website
import "./App.css";

// For Private components
import PrivateRoute from "./components/common/PrivateRoute";

// Layout Components
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// User based components
import Dashboard from "./components/dashboard/Dashboard";

// Products
import ProductList from "./components/products/ProductList";

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
            <Route exact path="/products" component={ProductList} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
