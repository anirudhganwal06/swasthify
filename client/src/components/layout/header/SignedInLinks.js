import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <Link to="/logout">
      <div className="headerItem headerRight myAcc vCenterContents hCenterContents">
        <p>Logout</p>
      </div>
    </Link>
  );
};

export default SignedInLinks;
