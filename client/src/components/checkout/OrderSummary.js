import React from "react";

const orderSummary = (props) => {
  const products = [];
  for (const i in props.products)
    for(const v in props.products[i].selectedVariants)
      products.push(
        <div className="checkoutProductContainer" key={i + "." + v}>
          <div className="row">
            <div className="col-3">
              <div className="imageContainer">
                <img
                  src={
                    props.products[i].images[0] ||
                    "/assets/images/noImageAvailable.jpg"
                  }
                  alt={props.products[i].image_alt}
                />
              </div>
            </div>
            <div className="col-9">
              <p>{props.products[i].name}</p>
              <p>{props.products[i].variants[v].size}</p>
              <span>
                {"₹ " + props.products[i].variants[v].discountedPrice}
              </span>
              <span className="fas fa-times ml-2 mr-2"></span>
              <span>{props.products[i].selectedVariants[v]}</span>
              <div className="finalProductPrice">
                {"₹ " +
                  props.products[i].variants[v].discountedPrice *
                    props.products[i].selectedVariants[v]}
              </div>
            </div>
          </div>
        </div>
      );

  return (
    <div className="mt-3">
      <h1 className="themeHeadingSm">Order Summary</h1>
      <div className="float-left">Sub Total</div>
      <div className="float-right">₹ {props.subTotal}</div>
      <br />
      <div className="float-left">Discount</div>
      <div className="float-right">₹ {props.discount}</div>
      <br />
      <hr />
      <div className="float-left">Total</div>
      <div className="float-right">₹ {props.total}</div>
      <br />
      <br />
      {products}
    </div>
  );
};

export default orderSummary;
