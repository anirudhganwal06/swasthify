import React from "react";
import { useFirebase } from "react-redux-firebase";

const SignedInLinks = () => {
  return (
    <React.Fragment>
      <div className="headerItem headerRight vCenterContents hCenterContents">
        <p>Cart</p>
      </div>
      <div
        className="headerItem headerRight vCenterContents hCenterContents"
        onClick={useFirebase().logout}
      >
        <p>Logout</p>
      </div>
    </React.Fragment>
  );
};

export default SignedInLinks;
