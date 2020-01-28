import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";

class AddAddress extends Component {
  constructor(props) {
    super(props);
    const address = props.editMode ? props.addresses[props.match.params.index] : {};
    this.state = {
      line1: props.editMode ? address.line1 : "",
      line2: props.editMode ? address.line2 : "",
      city: props.editMode ? address.city : "",
      pincode: props.editMode ? address.pincode : "",
      errors: {},
      editMode: props.editMode
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const firebase = this.props.firebase;
    console.log(firebase);
    let newAddresses = [ ...this.props.addresses ];
    let newAddress = {
      line1: this.state.line1,
      line2: this.state.line2,
      city: this.state.city,
      pincode: this.state.pincode
    };
    newAddresses[this.props.match.params.index] = newAddress;

    // submit logic goes here!
    if(this.state.editMode)
      firebase.updateProfile({
        addresses: newAddresses
      });
    else
      firebase.updateProfile({
        addresses: firebase.firestore.FieldValue.arrayUnion(newAddress)
      });
    this.props.history.goBack();
  };

  render() {
    console.log(this.props);
    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            {this.state.editMode ? <h1 className="themeHeadingLg">Edit Address</h1> : <h1 className="themeHeadingLg">Add Address</h1>}
          </div>
          <div className="col-12 col-md-8 col-xl-6">
            <form noValidate onSubmit={this.onSubmit}>
              <InputGroup
                id="line1"
                label="Line 1"
                type="text"
                name="line1"
                placeholder="Enter Line 1"
                value={this.state.line1}
                onChange={this.onChange}
                error={this.state.errors.line1}
                required
              />
              <InputGroup
                id="line2"
                label="Line 2"
                type="text"
                name="line2"
                placeholder="Enter Line 2"
                value={this.state.line2}
                onChange={this.onChange}
                error={this.state.errors.line2}
                required
              />
              <InputGroup
                id="city"
                label="City"
                type="text"
                name="city"
                placeholder="Enter City"
                value={this.state.city}
                onChange={this.onChange}
                error={this.state.errors.city}
                required
              />
              <InputGroup
                id="pincode"
                label="Pincode"
                type="text"
                name="pincode"
                placeholder="Enter Pincode"
                value={this.state.pincode}
                onChange={this.onChange}
                error={this.state.errors.pincode}
                required
              />
              <button
                className="btn themeColorHoverBtn btn-block"
                type="submit"
              >
                {this.state.editMode ? (
                  <span>Edit Address</span>
                ) : (
                  <span>Add Address</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addresses: state.firebase.profile.addresses
});

export default compose(withFirebase, withRouter, connect(mapStateToProps))(AddAddress);
