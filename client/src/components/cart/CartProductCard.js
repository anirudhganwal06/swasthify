import React from "react";
import { Link } from "react-router-dom";

import InputStepper from "../common/InputStepper";

const cartProductCard = props => (
  <div className="cartProductCard">
    <div className="row">
      <div className="col-4 colInRow">
        <Link to="/product/12345">
          <div className="imageContainer">
            <img src={props.product.image} alt="Product " />
          </div>
        </Link>
      </div>
      <div className="col-8 colInRow">
        <span className="badge badge-success">{props.product.tag}</span>
        <p className="productName">{props.product.name}</p>
        <p>
          {props.product.variants[props.variant].size}
        </p>
        <p className="productPrice">
            ₹ {props.product.variants[props.variant].discountedPrice}
        </p>
        <span className="fas fa-times"></span>
        <InputStepper
          value={props.product.selectedVariants[props.variant]}
          incrementHandler={() => props.incUnits(props.index, props.variant)}
          decrementHandler={() => props.decUnits(props.index, props.variant)}
        />
        <div className="cartFinalProductPrice">
          {"₹ " +
            (props.product.variants[props.variant].discountedPrice *
              props.product.selectedVariants[props.variant])}
        </div>
      </div>
    </div>
  </div>
);

export default cartProductCard;
