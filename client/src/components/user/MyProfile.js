import React, { Component } from "react";
import DeliveryAddressCard from "../common/DeliveryAddressCard";

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "Anirudh",
      email: "anirudhganwal06@gmail.com",
      mobile: "9468453223",
      addresses: [
        {
          line1: "Opposite Bhagwati Hospital",
          line2: "Kosli",
          city: "Rewari",
          pincode: "123302"
        },
        {
          line1: "Hostel 10",
          line2: "NIT Kurukshetra",
          city: "Kurukshetra",
          pincode: "136119"
        }
      ],
      errors: {}
    };
  }

  // onSubmit = e => {
  //   e.preventDefault();
  //   console.log("form submit");
  // };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteAddress = (e, index) => {
    e.preventDefault();
    let newAddresses = [...this.state.addresses];
    newAddresses.splice(index, 1);
    this.setState({ addresses: newAddresses });
  };

  render() {
    const deliveryAddresses = [];
    const addresses = this.state.addresses;
    for (let i = 0; i < addresses.length; i++) {
      deliveryAddresses.push(
        <DeliveryAddressCard
          key={i}
          index={i}
          line1={addresses[i].line1}
          line2={addresses[i].line2}
          city={addresses[i].city}
          pincode={addresses[i].pincode}
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
          <div className="col-12 col-md-8">
            <form>
              <label htmlFor="name" className="mt-3">
                Full Name
              </label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <button className="input-group-append btn themeColorHoverBtn ml-2">
                  Save
                </button>
              </div>
              <label htmlFor="email">Email Id</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email id"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <button className="input-group-append btn themeColorHoverBtn ml-2">
                  Save
                </button>
              </div>
              <label htmlFor="mobile">Mobile Number</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  id="mobile"
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={this.state.mobile}
                  onChange={this.onChange}
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

export default MyProfile;
