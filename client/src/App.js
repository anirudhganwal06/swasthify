import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// For connecting react app with redux store
import { Provider } from "react-redux";
import store from "./store";

// a common css file for entire website
import "./App.css";

// Layout Components
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

// Auth Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
