import React from "react";

const orderSummary = ({ order }) => {
  const products = [];
  for (const i in order.products)
    for(const v in order.products[i].selectedVariants)
      products.push(
        <div className="checkoutProductContainer" key={i + "." + v}>
          <div className="row">
            <div className="col-3">
              <div className="imageContainer">
                <img src={order.products[i].images[0]} alt={order.products[i].image_alt} />
              </div>
            </div>
            <div className="col-9">
              <p>{order.products[i].name}</p>
              <p>
                {order.products[i].variants[v].size}
              </p>
              <span>
                {"₹ " + order.products[i].variants[v].discountedPrice}
              </span>
              <span className="fas fa-times ml-2 mr-2"></span>
              <span>{order.products[i].selectedVariants[v]}</span>
              <div className="finalProductPrice">
                {"₹ " + order.products[i].variants[v].discountedPrice *
                order.products[i].selectedVariants[v]}
              </div>
            </div>
          </div>
        </div>
      );

  return (
    <div className="mt-3">
      <h1 className="themeHeadingSm">Order Summary</h1>
      <div className="float-left">Sub Total</div>
      <div className="float-right">₹ {order.subTotal}</div>
      <br />
      <div className="float-left">Discount</div>
      <div className="float-right">₹ {order.discount}</div>
      <br />
      <hr />
      <div className="float-left">Total</div>
      <div className="float-right">₹ {order.total}</div>
      <br />
      <br />
      {products}
    </div>
  );
};

export default orderSummary;
