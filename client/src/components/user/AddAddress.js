import React, { Component } from "react";
import InputGroup from "../common/InputGroup";
import { compose } from "redux";
import { connect } from "react-redux";

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line1: "",
      line2: "",
      city: "",
      pincode: "",
      errors: {},
      editMode: props.editMode
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            {this.state.editMode ? <h1>Edit Address</h1> : <h1>Add Address</h1>}
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

const mapStateToProps = (state, props) => ({
  address: state.firebase.profile.addresses[props.match.params.index]
});

export default compose(connect(mapStateToProps))(AddAddress);
