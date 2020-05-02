import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

import InputGroup from "../common/InputGroup";
import DeliveryAddressCard from "../common/DeliveryAddressCard";
import PaymentOptionCard from "./PaymentOptionCard";
import OrderSummary from "./OrderSummary";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recieverName: props.displayName,
      mobileNo: props.mobileNo,
      selectedAddress: {},
      selectedPaymentOption: "",
      products: [],
      couponcode: "",
      paymentOptions: [
        {
          name: "COD",
          description: "Cash On Delivery"
        },
        {
          name: "Pay Online",
          description: "Pay Online"
        }
      ],
      errors: {}
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchProducts();
  }

  fetchProducts = () => {
    const promises = [];

    for (const product in this.props.order.products)
      promises.push(this.props.firestore.doc("products/" + product).get());

    Promise.all(promises)
      .then(fetchedProducts => {
        const products = {};
        fetchedProducts.forEach(
          product =>
            (products[product.id] = {
              selectedVariants: this.props.order.products[product.id],
              ...product.data()
            })
        );
        this.setState({ products });
      })
      .catch(error => console.log("Error getting document:", error));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDeliveryAddress = index => {
    this.setState({ selectedAddress: index });
  };

  selectPaymentOption = name => {
    this.setState({ selectedPaymentOption: name });
  };

  render() {
    const deliveryAddresses = [];
    const paymentOptions = [];

    const addresses = this.props.addresses;
    for (const address in addresses) {
      deliveryAddresses.push(
        <DeliveryAddressCard
          key={address}
          index={address}
          line1={addresses[address].line1}
          line2={addresses[address].line2}
          city={addresses[address].city}
          pincode={addresses[address].pincode}
          selected={address === this.state.selectedAddress}
          onClick={this.selectDeliveryAddress}
        />
      );
    }
    deliveryAddresses.push(<DeliveryAddressCard key="new" addAddress={true} />);

    for (let i = 0; i < this.state.paymentOptions.length; i++) {
      let option = this.state.paymentOptions[i];
      paymentOptions.push(
        <PaymentOptionCard
          key={option.name}
          name={option.name}
          label={option.description}
          selected={option.name === this.state.selectedPaymentOption}
          onClick={this.selectPaymentOption}
        />
      );
    }

    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="themeHeadingLg">Checkout</h1>
          </div>
          <div className="col-12 col-md-7 col-xl-6">
            <form
              action="https://us-central1-swasthify-6d5c2.cloudfunctions.net/placeOrder"
              method="POST"
            >
              <input type="hidden" name="uid" value={this.props.uid} />
              <input
                type="hidden"
                name="reciever"
                value={this.state.recieverName}
              />

              <InputGroup
                id="recieverName"
                label="Reciever's Name"
                type="text"
                name="recieverName"
                placeholder="Enter reciever's name"
                value={this.state.recieverName}
                onChange={this.onChange}
                error={this.state.errors.recieverName}
                required
              />
              <InputGroup
                id="mobileNo"
                label="Reciever's Mobile Number"
                type="text"
                name="mobileNo"
                placeholder="Enter reciever's mobile number"
                value={this.state.mobileNo}
                onChange={this.onChange}
                error={this.state.errors.mobileNo}
                required
              />
              <input
                type="hidden"
                name="address"
                value={this.state.selectedAddress}
                required
              />
              <p>Delivery Address</p>
              <div className="row">{deliveryAddresses}</div>
              <small className="text-muted">
                Please select one of the above addresses on which you want your
                order to be delivered.
              </small>

              <input
                type="hidden"
                name="paymentMode"
                value={this.state.selectedPaymentOption}
                required
              />
              <p className="mt-3">Payment Options</p>
              <div className="row mb-2 justify-content-center">
                {paymentOptions}
              </div>

              <button
                className="btn themeColorHoverBtn btn-block mb-5"
                type="submit"
              >
                {this.state.selectedPaymentOption === "COD"
                  ? "Place Order"
                  : "Proceed to Pay"}
              </button>
            </form>
          </div>
          <div className="col-12 col-md-5 col-xl-4">
            <OrderSummary
              order={{ ...this.props.order, products: this.state.products }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  displayName: state.firebase.profile.displayName,
  mobileNo: state.firebase.profile.mobileNo,
  addresses: state.firebase.profile.addresses,
  order: state.firebase.profile.cart
});

export default compose(withFirestore, connect(mapStateToProps))(Checkout);
