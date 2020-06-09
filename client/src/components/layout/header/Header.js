import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import SideNav from "./SideNav";
import Cart from "../../cart/Cart";
import { signedInLinks, signedOutLinks } from "./links";
import loading from "../../common/Loading";

import { setFlashMessage } from "../../../actions/flashActions";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false,
      cartOpen: false,
      searchOpen: false,
      search: "",
    };
  }

  openSideNav = () => this.setState({ sideNavOpen: true });

  closeSideNav = () => {
    console.log("closeSideNav");
    this.setState({ sideNavOpen: false });
  };

  openCart = () => {
    if (this.props.isSignedIn)
      if (this.props.cart)
        if (Object.keys(this.props.cart.products).length !== 0)
          this.setState({ cartOpen: true });
        else this.props.setFlashMessage(true, "No Products in Cart!", 3000);
      else
        this.props.setFlashMessage(
          true,
          "Please wait for the login process to succeed!",
          3000
        );
    else this.props.setFlashMessage(true, "Please, login to use cart!", 3000);
  };

  closeCart = () => this.setState({ cartOpen: false });

  toggleSearch = () => {
    // if ()
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSearch = () => {
    this.props.history.push("/products?search=" + this.state.search);
  };

  render() {
    let signedInLinkJSX = [],
      signedOutLinkJSX = [],
      categoriesJSX = [];
    let importedLinks = null;
    if (this.props.isSignedIn) {
      importedLinks = signedInLinks;
      for (let i in importedLinks) {
        signedInLinkJSX.push(
          <Link className="dropdown-item" to={importedLinks[i].url} key={i}>
            {importedLinks[i].name}
          </Link>
        );
      }
    } else {
      importedLinks = signedOutLinks;
      for (let i in importedLinks) {
        signedOutLinkJSX.push(
          <Link className="nav-link" to={importedLinks[i].url} key={i}>
            {importedLinks[i].name}
          </Link>
        );
      }
    }

    let categories = [];
    if (this.props.misc && this.props.misc.categories) {
      categories = this.props.misc.categories;
      categoriesJSX.push(
        <Link className="dropdown-item" to="/products" key={"allProducts"}>
          All Products
        </Link>
      );
      for (let category of categories) {
        categoriesJSX.push(
          <Link
            className="dropdown-item"
            to={"/products?category=" + category}
            key={category}
          >
            {category}
          </Link>
        );
      }
    }

    return (
      <header className="text-center">
        {this.state.sideNavOpen === true ? (
          <SideNav
            username={this.props.name || this.props.mobileNo}
            closeSideNav={this.closeSideNav}
            isSignedIn={this.props.isSignedIn}
            misc={this.props.misc}
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
          {/* <button
            onClick={this.openSideNav}
            className="navbar-toggler mr-0 ml-0 p-1"
          > */}
          <span
            className="fas fa-bars navbar-toggler text-white"
            onClick={this.openSideNav}
          ></span>
          {/* </button> */}
          <Link className="navbar-brand" to="/">
            <img
              className="headerSwasthifyLogo mx-3"
              src="/assets/images/swasthifyLogo.png"
              alt="Swasthify"
            />
          </Link>
          <div className="nav-link ml-auto mr-0 pr-1 cartBtnSmall cPointer text-white">
            <span
              className="fas fa-search mr-4"
              onClick={this.toggleSearch}
            ></span>
            {this.props.location.pathname === "/checkout" ? (
              ""
            ) : (
              <React.Fragment>
                {this.props.cart ? (
                  <span className="badge badge-pill shoppingBadgeSm">
                    {Object.keys(this.props.cart.products || {}).length}
                  </span>
                ) : (
                  ""
                )}
                <span
                  className="fas fa-shopping-cart"
                  onClick={this.openCart}
                ></span>
              </React.Fragment>
            )}
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item dropdown mx-1">
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
              </li> */}
              <li className="nav-item mx-1">
                <span
                  className="nav-link cPointer"
                  title="Delivery in Faridabad only!"
                >
                  Faridabad
                </span>
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
                <div
                  className="dropdown-menu text-capitalize"
                  aria-labelledby="navbarDropdown"
                >
                  {this.props.misc ? categoriesJSX : loading("80px")}
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
                    {this.props.name || this.props.mobileNo}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {signedInLinkJSX}
                  </div>
                </li>
              ) : (
                <li className="nav-item mx-1">{signedOutLinkJSX}</li>
              )}

              <li className="nav-item active">
                <form className="form-inline my-2 my-lg-0">
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="navSearch"
                      name="search"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <button
                        onClick={this.onSearch}
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
              {this.props.location.pathname === "/checkout" ? (
                ""
              ) : (
                <li className="nav-item active mx-2">
                  <div className="nav-link cPointer" onClick={this.openCart}>
                    {this.props.cart ? (
                      <span className="badge badge-pill shoppingBadge">
                        {Object.keys(this.props.cart.products || {}).length}
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="fas fa-shopping-cart"></span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
        {this.state.searchOpen ? (
          <div className="searchDivSm">
            <form onSubmit={this.onSearch}>
              <input
                className="form-control w-100"
                name="search"
                type="text"
                autoFocus
                placeholder="Search for products ..."
                onChange={this.onChange}
                value={this.state.search}
              ></input>
              <input type="submit" hidden />
            </form>
          </div>
        ) : (
          ""
        )}
      </header>
    );
  }
}

const getQuery = () => [
  {
    collection: "products",
    doc: "miscellaneous",
    storeAs: "misc",
  },
];

const mapStateToProps = (state) => {
  return {
    name: state.firebase.profile.displayName,
    mobileNo: state.firebase.profile.mobileNo,
    isSignedIn: !state.firebase.auth.isEmpty,
    misc: state.firestore.data.misc,
    cart: state.firebase.profile.cart,
  };
};

export default compose(
  withRouter,
  firestoreConnect(getQuery),
  connect(mapStateToProps, { setFlashMessage })
)(Header);
