import React, { Component } from "react";
import OrderCard from "../user/OrderCard";

export default class OrdersList extends Component {
  render() {
    return (
      <div className="container p-3">
        <h1 className="text-center">My Orders</h1>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    );
  }
}
