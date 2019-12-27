import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
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
        <Link className="dropdown-item" to="/signup">
          Signup
        </Link>
        <Link className="dropdown-item" to="/login">
          Login
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SignedOutLinks;
