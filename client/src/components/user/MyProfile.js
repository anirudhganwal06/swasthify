import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";

import DeliveryAddressCard from "../common/DeliveryAddressCard";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.displayName,
      email: props.user.email,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateProfile = (e, data) => {
    e.preventDefault();
    const firebase = this.props.firebase;
    const errors = {};
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    switch (data) {
      case "name":
        if (name.checkValidity())
          firebase.updateProfile({
            displayName: name.value
          });
        else {
          errors.name = "Enter a valid username";

          this.setState({ errors });
        }
        break;

      case "email":
        if (email.checkValidity())
          firebase
            .updateEmail(email.value, true)
            .then(() => firebase.reloadAuth())
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
                  console.log(err);
              }
            });
        else {
          errors.email = "Enter a valid email";

          this.setState({ errors });
        }
        break;
      default:
    }
  };

  deleteAddress = (e, address) => {
    e.preventDefault();
    this.props.firestore.delete({
      collection: "users/" + this.props.uid + "/addresses",
      doc: address
    });
  };

  render() {
    const deliveryAddresses = [];
    const addresses = this.props.user.addresses;
    for (const address in addresses) {
      deliveryAddresses.push(
        <DeliveryAddressCard
          key={address}
          index={address}
          line1={addresses[address].line1}
          line2={addresses[address].line2}
          city={addresses[address].city}
          pincode={addresses[address].pincode}
          delete={true}
          deleteAddress={this.deleteAddress}
          edit={true}
        />
      );
    }
    deliveryAddresses.push(<DeliveryAddressCard key="new" addAddress={true} />);

    return (
      <div className="container p-3">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1>My Profile</h1>
          </div>
          <div className="col-12 col-md-8 mt-4">
            <form>
              <label htmlFor="name">Full Name</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
                <button
                  className="input-group-append btn themeColorHoverBtn ml-2"
                  onClick={e => this.updateProfile(e, "name")}
                >
                  Save
                </button>
              </div>
              <label htmlFor="email">Email ID</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email id"
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <button
                  className="input-group-append btn themeColorHoverBtn ml-2"
                  onClick={e => this.updateProfile(e, "email")}
                >
                  Save
                </button>
              </div>
              <label htmlFor="mobile">Mobile Number</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  id="mobile"
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={this.props.user.mobileNo}
                  disabled={true}
                />
              </div>
              <p>Delivery Address</p>
              <div className="row">{deliveryAddresses}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  user: state.firebase.profile
});

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(MyProfile);
