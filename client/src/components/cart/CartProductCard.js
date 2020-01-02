import React from "react";
import { Link } from "react-router-dom";

const cartProductCard = props => {
  let qtyOptions = [];

  for (let i = 0; i < props.product.variants.length; i++) {
    qtyOptions.push(
      <option value={i} key={i}>
        {props.product.variants[i].size + " " + props.product.size}
      </option>
    );
  }

  return (
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
            {props.product.variants[props.product.selectedQty].size +
              props.product.unit}
          </p>
          <p className="productPrice">
            Rs. {props.product.variants[props.product.selectedQty].actualPrice}
          </p>
          <span className="fas fa-times"></span>
          <div className="btn-group">
            <button
              type="button"
              className="btn themeColorHoverBtn"
              onClick={() => props.decUnits(props.index)}
            >
              -
            </button>
            <button type="button" className="btn btn-outline-dark" disabled>
              {props.product.units}
            </button>
            <button
              type="button"
              className="btn themeColorHoverBtn"
              onClick={() => props.incUnits(props.index)}
            >
              +
            </button>
          </div>
          <div className="cartFinalProductPrice">
            Rs.{" "}
            {props.product.variants[props.product.selectedQty].actualPrice *
              props.product.units}
          </div>
        </div>
      </div>
    </div>
  );
};

export default cartProductCard;
