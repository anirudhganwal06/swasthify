import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SideNav from "./SideNav";
import Search from "./Search";
import Cart from "../../cart/Cart";
import { signedInLinks, signedOutLinks } from "./links";

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
    let links = [];
    let importedLinks = null;
    if (this.props.isSignedIn) {
      importedLinks = signedInLinks;
    } else {
      importedLinks = signedOutLinks;
    }

    for (let i = 0; i < importedLinks.length; i++) {
      links.push(
        <Link className="dropdown-item" to={importedLinks[i].url} key={i}>
          {importedLinks[i].name}
        </Link>
      );
    }

    return (
      <header className="text-center">
        {this.state.sideNavOpen === true ? (
          <SideNav
            closeSideNav={this.closeSideNav}
            isSignedIn={this.props.isSignedIn}
          />
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
          <div className="headerItem headerLeft vCenterContents hCenterContents headerSwasthify">
            <img
              className="swasthifyLogo vCenter"
              src="/images/swasthifyLogo.webp"
              alt="Swasthify"
            />
          </div>
        </Link>
        {/* This section contains the MyAccount links */}
        <div
          className="headerItem headerLeft myAcc vCenterContents hCenterContents dropdown-toggle"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Select city
        </div>
        <div
          className="dropdown-menu text-center"
          aria-labelledby="dropdownMenuLink"
        >
          {links}
        </div>
        {/*********************************************/}
        {/* This section contains the MyAccount links */}
        <div
          className="headerItem headerLeft myAcc vCenterContents hCenterContents dropdown-toggle"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Category
        </div>
        <div
          className="dropdown-menu text-center"
          aria-labelledby="dropdownMenuLink"
        >
          {links}
        </div>
        {/*********************************************/}
        <Search classes="headerSearchItemBig" />
        <div
          className="headerItem headerRight myCart vCenterContents hCenterContents headerCart"
          onClick={this.openCart}
        >
          <p>
            <span className="fas fa-shopping-cart"></span>
          </p>
        </div>

        {/* This section contains the MyAccount links */}
        <div
          className="headerItem headerRight myAcc vCenterContents hCenterContents dropdown-toggle"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          My Account
        </div>
        <div
          className="dropdown-menu text-center"
          aria-labelledby="dropdownMenuLink"
        >
          {links}
        </div>
        {/*********************************************/}
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
