import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      {/* <div className="headerItem headerRight vCenterContents hCenterContents">
        <p></p>
      </div> */}
      <Link to="/login">
        <div className="headerItem headerRight vCenterContents hCenterContents">
          <p>Login</p>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default SignedOutLinks;
