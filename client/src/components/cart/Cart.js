import React from "react";
import CartProductCard from "./CartProductCard";

const cart = props => {
  return (
    <div className="cartContainer">
      <div className="cartEmptySpace" onClick={props.closeCart}></div>
      <div className="cart">
        <div className="cartHeading">
          <div
            class="cartBackArrow vCenterContents hCenterContents"
            onClick={props.closeCart}
          >
            <span className="fas fa-arrow-left"></span>
          </div>
          <h1>My Cart</h1>
        </div>
        <div className="cartMain text-left">
          <div className="billContainer">
            <div className="float-left">Sub Total</div>
            <div className="float-right">Rs. 100</div>
            <br />
            <div className="float-left">Delivery Charges</div>
            <div className="float-right">Rs. 29</div>
            <br />
            <hr />
            <div className="float-left">Total</div>
            <div className="float-right">Rs. 129</div>
            <br />
          </div>
          <div className="productsInCartContainer">
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
            <CartProductCard />
          </div>
        </div>
        <div className="cartFooter">
          <button className="btn themeColorHoverBtn btn-block">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default cart;
