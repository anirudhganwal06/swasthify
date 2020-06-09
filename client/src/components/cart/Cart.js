import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

import CartProductCard from "./CartProductCard";
import loading from "../common/Loading";
import calcTotal from "../../util/calcTotal";

class Cart extends Component {
  state = {
    products: {},
    subTotal: 0,
    discount: 0,
    total: 0,
    loading: true
  };

  decUnits = (pid, vid) => {
    const qty = this.props.cart.products[pid][vid];
    const updateQuery = {};
    if (qty > 1) {
      updateQuery["cart.products." + pid + "." + vid] = qty - 1;
    } else if (Object.keys(this.props.cart.products[pid]).length > 1) {
      updateQuery[
        "cart.products." + pid + "." + vid
      ] = this.props.firestore.FieldValue.delete();
    } else {
      updateQuery[
        "cart.products." + pid
      ] = this.props.firestore.FieldValue.delete();
    }

    this.props.firestore
      .update(
        {
          collection: "users",
          doc: this.props.uid
        },
        updateQuery
      );
  };

  incUnits = (productId, variant) => {
    // console.log("inc working");
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
      fetchedProducts.forEach((product) => {
        products[product.id] = {
          ...product.data()
        };
      });

      this.setState({
        products,
        subTotal: calcTotal(products, this.props.cart),
        loading: false
      });
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.products)
      this.setState({ subTotal: calcTotal(this.state.products, this.props.cart) });
  }

  render() {
    let productsInCart = [];

    for (const id in this.state.products) {
      const product = this.state.products[id];
      const variants = this.props.cart.products[id];
      for (const v in variants) {
        const variant = { id: v, ...product.variants[v], qty: variants[v] };
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
              <div className="float-right">₹ {this.state.subTotal}</div>
              <br />
              <div className="float-left">Discount</div>
              <div className="float-right">₹ {this.state.discount}</div>
              <br />
              <hr />
              <div className="float-left">Total</div>
              <div className="float-right">₹ {this.state.subTotal}</div>
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

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid,
  cart: state.firebase.profile.cart
});

export default compose(connect(mapStateToProps), withFirestore)(Cart);
