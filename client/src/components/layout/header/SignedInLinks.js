import React from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";

const SignedInLinks = () => {
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
        <Link className="dropdown-item" to="/my-profile">
          My profile
        </Link>
        <Link className="dropdown-item" onClick={useFirebase().logout}>
          Logout
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SignedInLinks;
