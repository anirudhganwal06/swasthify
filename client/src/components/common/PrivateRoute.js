import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import loading from "./Loading";

const PrivateRoute = ({ component: Component, auth, isLoaded, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoaded === true
        ? (auth === true
          ? <Component {...props} />
          : <Redirect to="/login" />)
        : loading("80px")
    }
  />
);

const mapStateToProps = state => ({
  auth: !state.firebase.auth.isEmpty,
  isLoaded: state.firebase.profile.isLoaded
});

export default connect(mapStateToProps)(PrivateRoute);
