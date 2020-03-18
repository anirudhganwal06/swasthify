import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

import CartProductCard from "./CartProductCard";
import loading from "../common/Loading";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loading: true
    };
  }

  decUnits = (productId, variant) => {
    let toDelete = true;
    for (let variant in this.state.products[productId].selectedVariants) {
      if (this.state.products[productId].selectedVariants[variant] > 1) {
        toDelete = false;
        break;
      }
    }
    if (toDelete) {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." +
          productId]: this.props.firestore.FieldValue.delete()
        }
      );
    } else {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." + productId + "." + variant]:
            this.state.products[productId].selectedVariants[variant] - 1
        }
      );
    }
  };

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

  fetchProducts = async () => {
    // if (this.state.products)
    // this.setState({ loading: true });
    try {
      const promises = [];
      
      for (const product in this.props.cart.products)
      promises.push(this.props.firestore.doc("products/" + product).get());
      
      const fetchedProducts = await Promise.all(promises);
      const products = {};
      fetchedProducts.forEach(
        product => {
          products[product.id] = {
            selectedVariants: this.props.cart.products[product.id],
            ...product.data()
          };
        }
      );
        
      this.setState({ products, loading: false });
    } catch(error) {
      console.log("Error getting document:", error);
    }
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
    // console.log(this.state.products);
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
            <h3>My Cart</h3>
          </div>
          <div className="cartMain text-left">
            <div className="billContainer">
              <div className="float-left">Sub Total</div>
              <div className="float-right">₹ {this.props.cart.subTotal}</div>
              <br />
              <div className="float-left">Discount</div>
              <div className="float-right">₹ {this.props.cart.discount}</div>
              <br />
              <hr />
              <div className="float-left">Total</div>
              <div className="float-right">₹ {this.props.cart.total}</div>
              <br />
            </div>
            {this.state.loading ? (
              loading("80px")
            ) : (
              <div className="productsInCartContainer">{productsInCart}</div>
            )}
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
