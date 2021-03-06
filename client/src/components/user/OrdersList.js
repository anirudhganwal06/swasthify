import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import loading from "../common/Loading";
import OrderCard from "../user/OrderCard";

class OrdersList extends Component {
  render() {
    const orderCards = [];

    for (const order in this.props.orders) {
      orderCards.push(
        <OrderCard
          key={order}
          orderid={order}
          order={this.props.orders[order]}
        />
      );
    }

    return (
      <div className="container p-3">
        <h1 className="text-center themeHeadingLg">My Orders</h1>
        {isLoaded(this.props.orderIds) ? (
          this.props.orderIds.length === 0 ? (
            <div className="text-center">
              <span className="far fa-frown fa-5x pt-3"></span>
              <h5 className="text-center mt-3">You haven't ordered yet!</h5>
            </div>
          ) : isLoaded(this.props.orders) ? (
            orderCards.reverse()
          ) : (
            loading("80px")
          )
        ) : (
          loading("80px")
        )}
      </div>
    );
  }
}

const getQuery = (props) =>
  props.orderIds.map((id) => ({
    collection: "orders",
    doc: id
  }));

const matchStateToProps = (state) => ({
  orderIds: state.firebase.profile.orders,
  orders: state.firestore.data.orders
});

export default compose(
  connect(matchStateToProps),
  firestoreConnect(getQuery)
)(OrdersList);
