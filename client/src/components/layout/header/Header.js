import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SideNav from "./SideNav";
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
    let signedInLinkComponent = [],
      signedOutLinkComponent = [],
      categoriesComponent = [];
    let importedLinks = null;
    if (this.props.isSignedIn) {
      importedLinks = signedInLinks;
      for (let i in importedLinks) {
        signedInLinkComponent.push(
          <Link className="dropdown-item" to={importedLinks[i].url}>
            {importedLinks[i].name}
          </Link>
        );
      }
    } else {
      importedLinks = signedOutLinks;
      for (let i in importedLinks) {
        signedOutLinkComponent.push(
          <Link className="nav-link" to={importedLinks[i].url}>
            {importedLinks[i].name}
          </Link>
        );
      }
    }

    const categories = this.props.categories;
    for (let i in categories) {
      categoriesComponent.push(
        <Link className="dropdown-item" to={categories[i].url}>
          {categories[i].name}
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
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/">
            <img
              className="headerSwasthifyLogo mr-3"
              src="/images/swasthifyLogo.webp"
              alt="Swasthify"
            />
          </Link>
          <div
            className="nav-link ml-auto mr-2 cartBtnSmall"
            onClick={this.openCart}
          >
            <span className="fas fa-shopping-cart"></span>
          </div>
          <button onClick={this.openSideNav} className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown mx-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select City
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="#">
                    Faridabad
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Gurgaon
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    More coming soon ...
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown mx-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select Category
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categoriesComponent}
                </div>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" to="/about-us">
                  About Us
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {this.props.isSignedIn ? (
                <li className="nav-item dropdown mx-2">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Anirudh
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {signedInLinkComponent}
                  </div>
                </li>
              ) : (
                <li className="nav-item mx-1">{signedOutLinkComponent}</li>
              )}

              <li className="nav-item active">
                <form className="form-inline my-2 my-lg-0">
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="navSearch"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn py-0 px-2 my-sm-0 "
                        id="navSearchBtn"
                        type="submit"
                      >
                        <span className="fas fa-search"></span>
                      </button>
                    </div>
                  </div>
                </form>
              </li>
              <li className="nav-item active mx-2">
                <div className="nav-link" onClick={this.openCart}>
                  <span className="fas fa-shopping-cart"></span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: !state.firebase.auth.isEmpty,
    categories: state.firestore.data.categories
  };
};

export default connect(mapStateToProps)(Header);
