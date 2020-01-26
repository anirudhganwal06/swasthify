import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./firebase";
import store from "./store";

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    profileFactory: userData => ({
      displayName: userData.displayName,
      email: userData.email,
      mobileNo: userData.phoneNumber,
      cart: {},
      wishlist: [],
      addresses: [],
      orders: {},
      coupons: []
    }),
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render((
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
