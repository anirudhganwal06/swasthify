import React from "react";
import { Link } from "react-router-dom";

import InputStepper from "../common/InputStepper";

const cartProductCard = (props) => (
  <div className="cartProductCard">
    <div className="row">
      <div className="col-4 colInRow">
        <Link to="/product/12345">
          <div className="imageContainer">
            {props.product.images[0] ? (
              <img src={props.product.images[0]} alt="Product " />
            ) : (
              <img src="/assets/images/noImageAvailable.jpg" alt="Product" />
            )}
          </div>
        </Link>
      </div>
      <div className="col-8 colInRow">
        <span className="badge badge-success">{props.product.tag}</span>
        <p className="productName">{props.product.name}</p>
        <p>{props.variant.size}</p>
        <p className="productPrice">₹ {props.variant.discountedPrice}</p>
        <span className="fas fa-times"></span>
        <InputStepper
          value={props.variant.qty}
          incrementHandler={() => props.incUnits(props.index, props.variant.id)}
          decrementHandler={() => props.decUnits(props.index, props.variant.id)}
        />
        <div className="cartFinalProductPrice">
          {"₹ " + props.variant.discountedPrice * props.variant.qty}
        </div>
      </div>
    </div>
  </div>
);

export default cartProductCard;
