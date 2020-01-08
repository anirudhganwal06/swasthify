import React, { Component } from "react";
import { Link } from "react-router-dom";

import CartProductCard from "./CartProductCard";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          name: "Cold Pressed Coconut Oil",
          image: "/assets/images/demoProduct.webp",
          unit: "ml",
          variants: [
            {
              actualPrice: 200,
              comparePrice: 220,
              size: 100
            },
            {
              actualPrice: 300,
              comparePrice: 330,
              size: 200
            },
            {
              actualPrice: 500,
              comparePrice: 550,
              size: 1000
            },
            {
              actualPrice: 900,
              comparePrice: 980,
              size: 2000
            }
          ],
          tag: "50% OFF",
          selectedQty: 0,
          units: 1
        },
        {
          name: "Cold Pressed Coconut Oil",
          image: "/assets/images/demoProduct.webp",
          unit: "ml",
          variants: [
            {
              actualPrice: 200,
              comparePrice: 220,
              size: 100
            },
            {
              actualPrice: 300,
              comparePrice: 330,
              size: 200
            },
            {
              actualPrice: 500,
              comparePrice: 550,
              size: 1000
            },
            {
              actualPrice: 900,
              comparePrice: 980,
              size: 2000
            }
          ],
          tag: "50% OFF",
          selectedQty: 0,
          units: 1
        }
      ],
      deliveryCharges: 0
    };
  }

  decUnits = index => {
    if (this.state.products[index].units - 1 === 0) {
      this.removeProductFromCart();
    } else {
      this.setState(prevState => {
        let newState = { ...prevState };
        newState.products[index].units -= 1;
        return { newState };
      });
    }
  };

  incUnits = index => {
    console.log("inc");

    this.setState(prevState => {
      let newState = { ...prevState };
      newState.products[index].units += 1;
      return { newState };
    });
  };

  removeProductFromCart = index => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.products.splice(index, 1);
      return { newState };
    });
  };

  render() {
    let subTotal = 0;
    let productsInCart = [];

    for (let i = 0; i < this.state.products.length; i++) {
      subTotal +=
        this.state.products[i].variants[this.state.products[i].selectedQty]
          .actualPrice * this.state.products[i].units;
    }
    for (let i = 0; i < this.state.products.length; i++) {
      productsInCart.push(
        <CartProductCard
          key={i}
          index={i}
          product={this.state.products[i]}
          incUnits={this.incUnits}
          decUnits={this.decUnits}
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
              <div className="float-right">Rs. {subTotal}</div>
              <br />
              <div className="float-left">Delivery Charges</div>
              <div className="float-right">
                Rs. {this.state.deliveryCharges}
              </div>
              <br />
              <hr />
              <div className="float-left">Total</div>
              <div className="float-right">
                Rs. {subTotal + this.state.deliveryCharges}
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
