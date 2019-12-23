import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SideNav from "./SideNav";
import Search from "./Search";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sideNavOpen: false
    };
  }

  openSideNav = () =>
    this.setState({ sideNavOpen: true });

  closeSideNav = () =>
    this.setState({ sideNavOpen: false });
  
  render() {
    return (
      <header className="text-center">
        {this.state.sideNavOpen === true ? <SideNav closeSideNav={this.closeSideNav} /> : ""}
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
        <Search classes="headerSearchItemBig"/>
        {this.props.isSignedIn ? <SignedInLinks logout="" /> : <SignedOutLinks />}
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

export default compose(firebaseConnect(), connect(mapStateToProps))(Header);
