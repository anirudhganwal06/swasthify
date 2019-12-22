import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { signupUser, sendOtp } from "../../actions/authActions";

class Signup extends Component {
  constructor() {
    super();

    this.uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          console.log(authResult);
          return  false;
        },
        // uiShown: function () {
        //   // The widget is rendered.
        //   // Hide the loader.
        //   document.getElementById('loader').style.display = 'none';
        // }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
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
    // this.state = {
    //   name: "",
    //   email: "",
    //   mobile: "",
    //   otp: "",
    //   otpSent: false,
    //   errors: {}
    // };
  }

  // onChange = e => {
  //   if (this.state.otpSent) {
  //     if (e.target.name === "otp") {
  //       this.setState({ [e.target.name]: e.target.value });
  //     }
  //   } else {
  //     this.setState({ [e.target.name]: e.target.value });
  //   }
  // };

  // onSubmit = e => {
  //   e.preventDefault();
  //   if (this.state.otpSent) {
  //     const newUser = {
  //       name: this.state.name,
  //       email: this.state.email,
  //       mobile: this.state.mobile,
  //       otp: this.state.otp
  //     };
  //     this.props.signupUser(newUser, this.props.history);
  //   } else {
  //     const newUser = {
  //       name: this.state.name,
  //       email: this.state.email,
  //       mobile: this.state.mobile
  //     };
  //     this.props.sendOtp(newUser);
  //   }
  // };

  render() {
    return (
      <div className="container p-5">
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );

    // const otpInput = (
    //   <InputGroup
    //     id="otp"
    //     label="OTP"
    //     type="text"
    //     name="otp"
    //     placeholder="Enter OTP"
    //     help="Enter the OTP sent your mobile number."
    //     value={this.state.otp}
    //     onChange={this.onChange}
    //     error={this.state.errors.otp}
    //   />
    // );

    // return (
    //   <div className="container p-5">
    //     <div className="row justify-content-center">
    //       <div className="col-12 text-center">
    //         <h1>Signup</h1>
    //       </div>
    //       <div className="col-12 col-md-6">
    //         <form noValidate onSubmit={this.onSubmit}>
    //           <InputGroup
    //             id="name"
    //             label="Name"
    //             type="text"
    //             name="name"
    //             placeholder="Enter full name"
    //             value={this.state.name}
    //             onChange={this.onChange}
    //             error={this.state.errors.name}
    //           />
    //           <InputGroup
    //             id="email"
    //             label="Email"
    //             type="email"
    //             name="email"
    //             placeholder="Enter email"
    //             help="Don't worry, we will not share your email with anybody."
    //             value={this.state.email}
    //             onChange={this.onChange}
    //             error={this.state.errors.email}
    //           />
    //           <InputGroup
    //             id="mobile"
    //             label="Mobile Number"
    //             type="text"
    //             name="mobile"
    //             placeholder="Enter mobile number"
    //             help="An OTP will be sent to your mobile number."
    //             value={this.state.mobile}
    //             onChange={this.onChange}
    //             error={this.state.errors.mobile}
    //           />
    //           {this.state.otpSent ? otpInput : ""}
    //           <button className="btn btn-primary btn-block" type="submit">
    //             {this.state.otpSent ? "Signup" : "Send OTP"}
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  sendOtp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signupUser, sendOtp })(Signup);
