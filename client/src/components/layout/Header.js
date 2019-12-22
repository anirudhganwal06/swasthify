import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      leftNavbarOpen: false
    };
  }

  openLeftNavbar = () => {
    this.setState({
      leftNavbarOpen: true
    });
  };

  closeLeftNavbar = () => {
    this.setState({
      leftNavbarOpen: false
    });
  };

  render() {
    const leftNavbar = (
      <div className="leftNavbarContainer">
        <div className="leftNavbar">
          <div className="row">
            <div className="col-12">
              <p>Login</p>
            </div>
            <div className="col-12">
              <p>Signup</p>
            </div>
          </div>
        </div>
        <div
          className="leftNavbarEmptySpace"
          onClick={this.closeLeftNavbar}
        ></div>
      </div>
    );
    return (
      <header className="text-center">
        {this.state.leftNavbarOpen === true ? leftNavbar : ""}
        <div
          className="headerItem headerMenuItem vCenterContents hCenterContents"
          onClick={this.openLeftNavbar}
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
        <div className="headerItem headerSearchItemBig ">
          <form>
            <input
              className="form-control searchInput"
              type="text"
              name="search"
              placeholder="Search for products"
            />
          </form>
        </div>
        <Link to="/login">
          <div className="headerItem headerRight vCenterContents hCenterContents">
            <p>Login</p>
          </div>
        </Link>
        <Link to="/signup">
          <div className="headerItem headerRight vCenterContents hCenterContents">
            <p>Signup</p>
          </div>
        </Link>
        <div className="headerItem headerSearchItemSmall vCenterContents hCenterContents">
          <form>
            <input
              className="form-control searchInput"
              type="text"
              name="search"
              placeholder="Search for products"
            />
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
