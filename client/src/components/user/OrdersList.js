import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div className="container p-3">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1>My Orders</h1>
          </div>
          <div className="col-12 col-md-8 mt-3"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  wishlist: state.firebase.profile.wishlist
});

export default compose(connect(mapStateToProps), withFirestore)(OrderList);
