import React, { Component } from "react";

import InputGroup from "../common/InputGroup";
import DeliveryAddressCard from "./DeliveryAddressCard";
import PaymentOptionCard from "./PaymentOptionCard";
import OrderSummary from "./OrderSummary";

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      recieverName: "",
      selectedAddress: null,
      selectedPaymentOption: "",
      paymentOptions: [
        {
          name: "COD",
          description: "Cash On Delivery"
        },
        {
          name: "Card",
          description: "Debit / Credit Card"
        },
        {
          name: "UPI",
          description: "Unified Payment Interface"
        }
      ],
      order: {
        totalAmount: "129",
        subTotal: "100",
        deliveryCharges: "29",
        products: [
          {
            name: "Cold Pressed Coconut Oil",
            imageUrl: "/images/demoProduct.webp",
            rate: [
              [200, 100, "ml"],
              [300, 200, "ml"],
              [500, 1, "lt"],
              [900, 2, "lt"]
            ],
            selectedQty: 0,
            units: 3
          },
          {
            name: "Cold Pressed Coconut Oil",
            imageUrl: "/images/demoProduct.webp",
            rate: [
              [200, 100, "ml"],
              [300, 200, "ml"],
              [500, 1, "lt"],
              [900, 2, "lt"]
            ],
            selectedQty: 0,
            units: 3
          }
        ]
      },
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDeliveryAddress = index => {
    this.setState({ selectedAddress: index });
  };

  selectPaymentOption = name => {
    this.setState({ selectedPaymentOption: name });
  };

  onSubmit = e => {
    e.preventDefault();
    // on submit logic
  };

  render() {
    const deliveryAddresses = [];
    const paymentOptions = [];

    for (let i = 0; i < 2; i++) {
      deliveryAddresses.push(
        <DeliveryAddressCard
          key={i}
          index={i}
          addAddress={false}
          selected={i === this.state.selectedAddress}
          houseNo="1029"
          colony="Vikas Colony"
          city="Kosli, Rewari"
          state="Haryana"
          pincode="123302"
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
            <h1>Checkout</h1>
          </div>
          <div className="col-12 col-md-7 col-xl-6">
            <form noValidate onSubmit={this.onSubmit}>
              <InputGroup
                id="recieverName"
                label="Reciever's Name"
                type="text"
                name="recieverName"
                placeholder="Enter reciever's name"
                value={this.state.recieverName}
                onChange={this.onChange}
                error={this.state.errors.recieverName}
              />
              <p>Delivery Address</p>
              <div className="row">{deliveryAddresses}</div>
              <small className="text-muted">
                Please select one of the above addresses on which you want your
                order to be delivered.
              </small>
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
            <OrderSummary order={this.state.order} />
          </div>
        </div>
      </div>
    );
  }
}
