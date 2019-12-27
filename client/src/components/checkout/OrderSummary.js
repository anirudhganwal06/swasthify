import React from "react";

const orderSummary = props => {
  let products = [];
  for (let i = 0; i < props.order.products.length; i++) {
    products.push(
      <div className="checkoutProductContainer" key={i}>
        <div className="row">
          <div className="col-3">
            <div className="imageContainer">
              <img src={props.order.products[i].imageUrl} alt="Product " />
            </div>
          </div>
          <div className="col-9">
            <p>{props.order.products[i].name}</p>
            <p>
              {
                props.order.products[i].rate[
                  props.order.products[i].selectedQty
                ][1]
              }{" "}
              {
                props.order.products[i].rate[
                  props.order.products[i].selectedQty
                ][2]
              }
            </p>
            <span>
              Rs.{" "}
              {
                props.order.products[i].rate[
                  props.order.products[i].selectedQty
                ][0]
              }
            </span>
            <span className="fas fa-times ml-2 mr-2"></span>
            <span>{props.order.products[i].units}</span>
            <div className="finalProductPrice">
              Rs.{" "}
              {props.order.products[i].rate[
                props.order.products[i].selectedQty
              ][0] * props.order.products[i].units}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-3">
      <h1 className="themeHeadingSm">Order Summary</h1>
      <div className="float-left">Sub Total</div>
      <div className="float-right">Rs. {props.order.subTotal}</div>
      <br />
      <div className="float-left">Delivery Charges</div>
      <div className="float-right">Rs. {props.order.deliveryCharges}</div>
      <br />
      <hr />
      <div className="float-left">Total</div>
      <div className="float-right">
        Rs. {+props.order.subTotal + +props.order.deliveryCharges}
      </div>
      <br />
      <br />
      {products}
    </div>
  );
};

export default orderSummary;
