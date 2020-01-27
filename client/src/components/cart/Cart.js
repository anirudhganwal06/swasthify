import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

import CartProductCard from "./CartProductCard";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: {}
    };
  }

  decUnits = (productId, variant) => {
    console.log("dec unit")
    // if (this.state.products[productId].selectedVariants[variant] > 0) {

      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." + productId + "." + variant]:
            this.state.products[productId].selectedVariants[variant] > 1
              ? // this.props.firestore.FieldValue.increment(-1)
                this.state.products[productId].selectedVariants[variant] - 1
              : this.props.firestore.FieldValue.delete()
        }
      );
      // };
    }

  incUnits = (productId, variant) => {
    console.log("inc working");
    this.props.firestore.update(
      {
        collection: "users",
        doc: this.props.uid
      },
      {
        ["cart.products." +
        productId +
        "." +
        variant]: this.props.firestore.FieldValue.increment(1)
      }
    );
  };

  fetchProducts = () => {
    const promises = [];

    for (const product in this.props.cart.products)
      promises.push(this.props.firestore.doc("products/" + product).get());

    Promise.all(promises)
      .then(fetchedProducts => {
        const products = {};
        fetchedProducts.forEach(
          product =>
            (products[product.id] = {
              selectedVariants: this.props.cart.products[product.id],
              ...product.data()
            })
        );
        this.setState({ products });
      })
      .catch(error => console.log("Error getting document:", error));
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchProducts();
  }

  render() {
    let productsInCart = [];

    for (const id in this.state.products) {
      const product = this.state.products[id];
      for (const variant in product.selectedVariants) {
        productsInCart.push(
          <CartProductCard
            key={id + "." + variant}
            index={id}
            product={product}
            variant={variant}
            incUnits={this.incUnits}
            decUnits={this.decUnits}
          />
        );
      }
    }

    return (
      <div className="cartContainer">
        <div className="cartEmptySpace" onClick={this.props.closeCart}></div>
        <div className="cart">
          <div className="cartHeading">
            <div
              className="cartBackArrow vCenterContents hCenterContents"
              onClick={this.props.closeCart}
            >
              <span className="fas fa-arrow-left"></span>
            </div>
            <h1>My Cart</h1>
          </div>
          <div className="cartMain text-left">
            <div className="billContainer">
              <div className="float-left">Sub Total</div>
              <div className="float-right">₹ {this.props.cart.subTotal}</div>
              <br />
              <div className="float-left">Discount</div>
              <div className="float-right">
                ₹ {this.props.cart.discount}
              </div>
              <br />
              <hr />
              <div className="float-left">Total</div>
              <div className="float-right">
                ₹ {this.props.cart.total}
              </div>
              <br />
            </div>
            <div className="productsInCartContainer">{productsInCart}</div>
          </div>
          <div className="cartFooter">
            <Link to="/checkout">
              <button
                className="btn themeColorHoverBtn btn-block"
                onClick={this.props.closeCart}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  cart: state.firebase.profile.cart
});

export default compose(connect(mapStateToProps), withFirestore)(Cart);
