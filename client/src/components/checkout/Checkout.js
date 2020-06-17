import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import validator from "validator";

import InputGroup from "../common/InputGroup";
import DeliveryAddressCard from "../common/DeliveryAddressCard";
import PaymentOptionCard from "./PaymentOptionCard";
import OrderSummary from "./OrderSummary";
import ApplicableCoupons from "./ApplicableCoupons";
import { discountValue } from "../../util/coupons";
import calcTotal from "../../util/calcTotal";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recieverName: props.user ? props.user.displayName : "",
      mobileNo: props.user ? props.user.mobileNo : "",
      selectedAddress: {},
      selectedPaymentOption: "",
      products: [],
      subTotal: 0,
      discount: 0,
      total: 0,
      couponId: "",
      paymentOptions: [
        {
          name: "COD",
          description: "Cash On Delivery",
        },
        {
          name: "Pay Online",
          description: "Pay Online",
        },
      ],
      errors: {},
      btnDisabled: true,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    const promises = [];

    if (this.props.order && this.props.order.products) {
      for (const product in this.props.order.products)
        promises.push(this.props.firestore.doc("products/" + product).get());
      Promise.all(promises)
        .then((fetchedProducts) => {
          const products = {};
          fetchedProducts.forEach(
            (product) =>
              (products[product.id] = {
                selectedVariants: this.props.order.products[product.id],
                ...product.data(),
              })
          );

          const subTotal = calcTotal(products, this.props.order);
          this.setState({ products, subTotal, total: subTotal });
        })
        .catch((error) => console.log("Error getting document:", error));
    }
  };

  validateCheckout = () => {
    if (
      !validator.isLength(this.state.recieverName, { min: 3, max: 64 }) ||
      !validator.isMobilePhone(this.state.mobileNo) ||
      this.state.selectedAddress === {} ||
      this.state.selectedPaymentOption === "" ||
      this.state.total <= 0
    )
      this.setState({
        btnDisabled: true,
      });
    else {
      this.setState({
        btnDisabled: false,
      });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateCheckout);
  };

  selectDeliveryAddress = (index) => {
    this.setState({ selectedAddress: index }, this.validateCheckout);
  };

  selectPaymentOption = (name) => {
    this.setState({ selectedPaymentOption: name }, this.validateCheckout);
  };

  selectCoupon = (couponId) => {
    const subTotal = calcTotal(this.state.products, this.props.order);
    const [discount, show] = discountValue(
      { uid: this.props.uid, ...this.props.user },
      this.props.coupons[couponId]
    );
    const total = subTotal - discount;
    if (discount === 0 || !show) couponId = "";
    this.setState({ couponId, subTotal, discount, total });
  };

  render() {
    const deliveryAddresses = [];
    const paymentOptions = [];

    const addresses = this.props.user ? this.props.user.addresses : [];
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
        <form
          action="https://us-central1-swanand-1958d.cloudfunctions.net/placeOrder"
          method="POST"
        >
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h1 className="themeHeadingLg">Checkout</h1>
            </div>
            <div className="col-12 col-md-7 col-xl-6">
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

              <p>Applicable Coupons</p>
              <input
                type="hidden"
                name="couponId"
                value={this.state.couponId}
              />
              <ApplicableCoupons
                selectCoupon={this.selectCoupon}
                selectedCoupon={this.state.couponId}
                coupons={this.props.coupons}
              />
            </div>
            <div className="col-12 col-md-5 col-xl-4">
              <OrderSummary
                products={this.state.products}
                subTotal={this.state.subTotal}
                discount={this.state.discount}
                total={this.state.total}
              />
            </div>
            <div className="col-12 col-xl-10 text-center py-2">
              <button
                className="btn themeColorHoverBtn btn-block"
                type="submit"
                disabled={this.state.btnDisabled}
              >
                {this.state.selectedPaymentOption === "COD"
                  ? "Place Order"
                  : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const getQuery = () => [
  {
    collection: "coupons",
  },
];

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
  user: state.firebase.profile,
  order: state.firebase.profile.cart,
  coupons: state.firestore.data.coupons,
});

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(Checkout);
