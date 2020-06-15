import React, { Component } from "react";
import { withFirebase } from "react-redux-firebase";

import InputGroup from "../common/InputGroup";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      errors: {}
    };
  }

  onChange = e =>
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const firebase = this.props.firebase;
    const errors = {};
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    if (e.target.checkValidity() === false) {
      if (name.checkValidity() === false)
        errors.name = "Enter a username";

      else if (email.checkValidity() === false)
        errors.email = "Enter a valid email";

      this.setState({ errors });
    }
    else
      firebase.updateEmail(this.state.email, true)
        .then(() => firebase.updateProfile({ displayName: name.value }))
        .then(() => firebase.reloadAuth())
        .then(() => this.props.history.push("/"))
        .catch(err => {
          switch (err.code) {
            case "auth/email-already-in-use":
              errors.email = "Email already in use";
              this.setState({ errors });
              break;

            case "auth/requires-recent-login":
              this.props.history.push("/login");
              break;

            default:
          }
        });
  };

  render() {
    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="themeHeadingLg">Signup</h1>
          </div>
          <div className="col-12 col-md-8 col-xl-6">
            <form noValidate onSubmit={this.onSubmit}>
              <InputGroup
                id="name"
                label="Name"
                type="text"
                name="name"
                placeholder="Enter full name"
                value={this.state.name}
                onChange={this.onChange}
                error={this.state.errors.name}
                required
              />
              <InputGroup
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
                help="Don't worry, we will not share your email with anybody."
                value={this.state.email}
                onChange={this.onChange}
                error={this.state.errors.email}
                required
              />
              <button className="btn themeColorHoverBtn btn-block" type="submit">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Signup);
