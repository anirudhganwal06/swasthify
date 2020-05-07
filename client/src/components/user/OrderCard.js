import React from "react";
import { withRouter, Link } from "react-router-dom";

const OrderCard = props => {
  const order = props.order;

  const productsList = [];

  for (const i in order.products) {
    for(const v in order.products[i].variants)
      productsList.push(
        <div key={i + order.products[i].variants[v].size} className="cartProductCard">
          <div className="row">
            <div className="col-4 col-sm-3 col-md-2 colInRow">
              <Link to={"/product/" + i}>
                <div className="imageContainer">
                  <img src={order.products[i].images[0]} alt="Product " />
                </div>
              </Link>
            </div>
            <div className="col-8 col-sm-9 col-md-10 colInRow">
              <p>{order.products[i].name}</p>
              <small className="text-muted">{order.products[i].variants[v].size}</small>
              <p className="bold">
                {"₹ " + order.products[i].variants[v].discountedPrice + " "}
                <span>&times;</span>
                {" " + order.products[i].variants[v].quantity}
              </p>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="card my-3">
      <div className="card-header">
        <span className="btn btn-primary py-0">{props.orderid}</span>
        <p className="float-right">
          {order.deliveryStatus === "DELIVERED" ? (
            <span>
              <span className="text-muted">Delivered on </span>
              {order.deliveryDate.toDate().toDateString()}
            </span>
          ) : (
            <span>
              <span className="text-muted">Status: </span>
              <span className="text-capitalize">
                {(order.deliveryStatus === "NOT REVIEWED" || order.deliveryStatus === "REVIEWED") ?
                  "PROCESSING" :
                  order.deliveryStatus}
              </span>
            </span>
          )}
        </p>
      </div>
      <div className="card-body">
        {productsList}
      </div>
      <div className="card-header">
        <p className="float-left">{"Ordered on " + order.orderDate.toDate().toDateString()}</p>
        <p className="float-right">
          <span className="text-muted">Order Total: </span>
          {"₹ " + order.total}
        </p>
      </div>
    </div>
  );
};

export default withRouter(OrderCard);
