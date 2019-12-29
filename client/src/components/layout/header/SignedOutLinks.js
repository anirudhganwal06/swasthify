import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <Link to="/login">
      <div className="headerItem headerRight vCenterContents hCenterContents">
        <p>Login</p>
      </div>
    </Link>
  );
};

export default SignedOutLinks;
