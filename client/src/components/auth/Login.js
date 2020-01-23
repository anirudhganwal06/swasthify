import React from "react";
import { useFirebase } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";

import { setFlashMessage } from "../../actions/flashActions";

const Login = props => {
  const firebase = useFirebase();

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        firebase.handleRedirectResult(authResult)
          .then(() => {
            if (authResult.additionalUserInfo.isNewUser)
              props.history.push("/signup");
            else {
              props.setFlashMessage(true, "User logged in successfully!", 3000);
              props.history.push("/");
            }
          });
        return false;
      },
      // uiShown: function () {
      //   // The widget is rendered.
      //   // Hide the loader.
      //   document.getElementById('loader').style.display = 'none';
      // }
    },
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "IN"
      }
    ],
    // Terms of service url.
    tosUrl: "",
    // Privacy policy url.
    privacyPolicyUrl: ""
  };

  return (
    <div className="container p-5">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

// const mapStateToProps = state => ({

// });

export default connect(null, {setFlashMessage})(Login);
