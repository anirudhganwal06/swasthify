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
    this.props.firebase.updateProfile({
      email: this.state.email,
      name: this.state.name
    });
  };

  render() {
    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1>Signup</h1>
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
              />
              <button className="btn btn-primary btn-block" type="submit">
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
