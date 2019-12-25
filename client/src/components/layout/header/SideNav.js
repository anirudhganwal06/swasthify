import React from "react";

const sideNav = props => {
  return (
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
        onClick={props.closeSideNav}
      ></div>
    </div>
  );
};

export default sideNav;