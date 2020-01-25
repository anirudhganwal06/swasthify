import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "SWF0000001",
      products: [
        {
          title: "Haldi Powder",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/swasthify-6d5c2.appspot.com/o/products%2Fwheat.jpg?alt=media&token=beb58574-5f00-42b1-ae78-9d8ec1fff538",
          price: "499"
        },
        {
          title: "Haldi Powder",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/swasthify-6d5c2.appspot.com/o/products%2Fwheat.jpg?alt=media&token=beb58574-5f00-42b1-ae78-9d8ec1fff538",
          price: "499"
        }
      ],
      orderDate: "12 September, 2019",
      deliveryStatus: "delivered",
      deliveryDate: "14 September, 2019",
      paymentStatus: "Succeed",
      totalAmount: "900"
    };
  }

  render() {
    const order = this.state;

    const productsList = [];

    for (let i in order.products) {
      productsList.push(
        <div className="cartProductCard">
          <div className="row">
            <div className="col-2 colInRow">
              <Link to="/product/flour-wheat">
                <div className="imageContainer">
                  <img src={order.products[i].imageUrl} alt="Product " />
                </div>
              </Link>
            </div>
            <div className="col-10 colInRow">
              <p>{order.products[i].title}</p>
              <p className="text-muted">{"Rs. " + order.products[i].price}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="card my-3">
        <div className="card-header">
          <span className="btn btn-primary py-0">{order.id}</span>
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
          <p className="float-left">{"Ordered on " + order.orderDate}</p>
          <p className="float-right">
            <span className="text-muted">Order Total: </span>
            {"Rs. " + order.totalAmount}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default compose(
  withFirestore,
  withRouter,
  connect(mapStateToProps)
)(OrderCard);
