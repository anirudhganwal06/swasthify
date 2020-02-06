import React, { Component } from "react";
import OrderCard from "../user/OrderCard";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import loading from "../common/Loading";

class OrdersList extends Component {
  ids = [];

  getProducts() {
    const productIds = new Set();

    for(const order in this.props.orders)
      Object.keys(this.props.orders[order].products).forEach(key => productIds.add(key));

    for(const id of productIds.values())
      if(!this.ids.includes(id)) {
        this.ids.push(id);
        this.props.firestore.get({ collection: "products", doc: id});
      }
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps)
      this.getProducts();
  }

  render() {
    const orderCards = [];

    for(const order in this.props.orders) {
      orderCards.push(
        <OrderCard key={order} orderid={order} order={this.props.orders[order]} />
      );
    }

    return (
      <div className="container p-3">
        <h1 className="text-center themeHeadingLg">My Orders</h1>
        {isLoaded(this.props.orders) ? orderCards.reverse() : loading("80px")}
      </div>
    );
  }
}

const getQuery = props => props.orderIds.map(id => ({
  collection: "orders",
  doc: id
}));

const matchStateToProps = state => ({
  orderIds: state.firebase.profile.orders,
  orders: state.firestore.data.orders,
  products: state.firestore.data.products || {}
});

export default compose(
  connect(matchStateToProps),
  firestoreConnect(getQuery)
)(OrdersList);