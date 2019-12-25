import React from "react";
import { useFirebase } from "react-redux-firebase";

const SignedInLinks = () => {
  return (
    <React.Fragment>
      <div
        className="headerItem headerRight myAcc vCenterContents hCenterContents"
        onClick={useFirebase().logout}
      >
        <p>Logout</p>
      </div>
    </React.Fragment>
  );
};

export default SignedInLinks;
