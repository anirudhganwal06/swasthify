import React from "react";
import {Link } from "react-router-dom";

const Error = props => {

  let errorContent;

  if (props.statusCode === "404") {
    errorContent = (
      <div>
        <h4 className="text-muted pb-3">404 Error - Page Not Found</h4>
        <h3>One of our Developer must be fired for this unacceptable failure!</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="pb-2">Whoops!</h1>
      {errorContent}
      <p className="pt-2">
        <Link to="/">We think you should go back to homepage {">>>"}</Link>
      </p>
    </div>
  );
};

export default Error;