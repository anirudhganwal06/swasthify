import React from "react";
import { Redirect } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

const Logout = () => {
  useFirebase().logout();
  
  return (
    <Redirect to="/"></Redirect>
  );
};

export default Logout;