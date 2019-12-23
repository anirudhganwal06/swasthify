import React from "react";

const SignedInLinks = props => {
  return (
    <React.Fragment>
      <div 
        className="headerItem headerRight vCenterContents hCenterContents"
        onClick="">
        <p>Logout</p>
      </div>
    </React.Fragment>
  );
};

export default SignedInLinks;