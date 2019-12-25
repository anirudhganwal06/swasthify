import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SideNav from "./SideNav";
import Search from "./Search";
import Cart from "../../cart/Cart";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false,
      cartOpen: false
    };
  }

  openSideNav = () => this.setState({ sideNavOpen: true });

  closeSideNav = () => this.setState({ sideNavOpen: false });

  openCart = () => this.setState({ cartOpen: true });

  closeCart = () => this.setState({ cartOpen: false });

  render() {
    return (
      <header className="text-center">
        {this.state.sideNavOpen === true ? (
          <SideNav closeSideNav={this.closeSideNav} />
        ) : (
          ""
        )}
        {this.state.cartOpen === true ? (
          <Cart closeCart={this.closeCart} />
        ) : (
          ""
        )}
        <div
          className="headerItem headerMenuItem vCenterContents hCenterContents"
          onClick={this.openSideNav}
        >
          <i className="fas fa-bars fa-2x"></i>
        </div>
        <Link to="/">
          <div className="headerItem headerLeft vCenterContents hCenterContents">
            <img
              className="swasthifyLogo vCenter"
              src="/images/swasthifyLogo.webp"
              alt="Swasthify"
            />
          </div>
        </Link>
        <Search classes="headerSearchItemBig" />
        <div
          className="headerItem headerRight myCart vCenterContents hCenterContents"
          onClick={this.openCart}
        >
          <p>
            <span className="fas fa-shopping-cart"></span>
          </p>
        </div>
        {this.props.isSignedIn ? <SignedInLinks /> : <SignedOutLinks />}
        <Search classes="headerSearchItemSmall vCenterContents hCenterContents" />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: !state.firebase.auth.isEmpty
  };
};

export default connect(mapStateToProps)(Header);
