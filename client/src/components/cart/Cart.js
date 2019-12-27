import React, { Component } from "react";
import { Link } from "react-router-dom";

import CartProductCard from "./CartProductCard";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          name: "abc",
          imageUrl: "/images/demoProduct.webp",
          rate: [
            [200, 100, "ml"],
            [300, 200, "ml"],
            [500, 1, "lt"],
            [900, 2, "lt"]
          ],
          tag: "50% OFF",
          selectedQty: 0,
          units: 1
        },
        {
          name: "abc",
          imageUrl: "/images/demoProduct.webp",
          rate: [
            [200, 100, "ml"],
            [300, 200, "ml"],
            [500, 1, "lt"],
            [900, 2, "lt"]
          ],
          tag: "50% OFF",
          selectedQty: 0,
          units: 1
        }
      ],
      subTotal: 0,
      deliveryCharges: 0
    };
  }

  componentDidMount = () => {
    let subTotal = 0;
    for (let i = 0; i < this.state.products.length; i++) {
      subTotal +=
        this.state.products[i].rate[this.state.products[i].selectedQty][0] *
        this.state.products[i].units;
    }
    this.setState({ subTotal });
  };

  removeProductFromCart = index => {
    let newProductsArr = [...this.state.products];
    newProductsArr.splice(index, 1);
    this.setState({ products: newProductsArr });
  };

  render() {
    let productsInCart = [];

    for (let i = 0; i < this.state.products.length; i++) {
      productsInCart.push(
        <CartProductCard
          key={i}
          product={this.state.products[i]}
          removeProductFromCart={() => this.removeProductFromCart(i)}
        />
      );
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
              <div className="float-right">Rs. {this.state.subTotal}</div>
              <br />
              <div className="float-left">Delivery Charges</div>
              <div className="float-right">
                Rs. {this.state.deliveryCharges}
              </div>
              <br />
              <hr />
              <div className="float-left">Total</div>
              <div className="float-right">
                Rs. {this.state.subTotal + this.state.deliveryCharges}
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

export default Cart;
