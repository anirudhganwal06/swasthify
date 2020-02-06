import React from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import loading from "../common/Loading";

const OrderCard = props => {
  const order = props.order;

  const productsList = [];

  for (const i in order.products) {
    for(const v in order.products[i])
      productsList.push(
        <div key={i} className="cartProductCard">
          <div className="row">
            {(props.products && props.products[i]) ? (
              <React.Fragment>
                <div className="col-4 col-sm-3 col-md-2 colInRow">
                  <Link to={"/product/" + i}>
                    <div className="imageContainer">
                      <img src={props.products[i].image} alt="Product " />
                    </div>
                  </Link>
                </div>
                <div className="col-8 col-sm-9 col-md-10 colInRow">
                  <p>{props.products[i] && props.products[i].name}</p>
                  <small className="text-muted">
                    {props.products[i].variants[v].size + " " + props.products[i].unit}
                  </small>
                  <p className="bold">
                    {"₹ " + order.products[i][v].price + " "}
                    <span>&times;</span>
                    {" " + order.products[i][v].quantity}
                  </p>
                </div>
              </React.Fragment>) : loading("80px")}
          </div>
        </div>
      );
  }

  return (
    <div className="card my-3">
      <div className="card-header">
        <span className="btn btn-primary py-0">{props.orderid}</span>
        <p className="float-right">
          {order.deliveryStatus === "delivered" ? (
            <span>
              <span className="text-muted">Delivered on </span>
              {order.deliveryDate}
            </span>
          ) : (
            <span>
              <span className="text-muted">Delivery: </span>
              <span className="text-capitalize">{order.deliveryStatus}</span>
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

const mapStateToProps = state => ({
  products: state.firestore.data.products
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(OrderCard);
