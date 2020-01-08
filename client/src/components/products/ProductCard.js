import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import InputStepper from "../common/InputStepper";
import { withFirebase, firestoreConnect, isLoaded } from "react-redux-firebase";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: 0,
      units: 0,
      wishlisted: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return isLoaded(props.cart, props.wishlist) ? {
      ...state,
      units: ((props.cart[props.productId] &&
        props.cart[props.productId][state.variant]) || 0),
      wishlisted: props.wishlist.indexOf(props.productId) !== -1
    } : state;
  }

  changeVariant = e => {
    this.setState({
      variant: e.target.value
    });
  };

  toggleWishlist = () => {
    const firestore = this.props.firestore;
    firestore.update({
      collection: "users",
      doc: this.props.uid
    }, {
      "wishlist": this.state.wishlisted ?
        firestore.FieldValue.arrayRemove(this.props.productId) :
        firestore.FieldValue.arrayUnion(this.props.productId)
    });
  };

  increaseQty = () => {
    this.props.firestore.update({
      collection: "users",
      doc: this.props.uid
    }, {
      ["cart." + this.props.productId + "." + this.state.variant]: 
        this.props.firestore.FieldValue.increment(1)
    });
  }

  decreaseQty = () => {
    this.props.firestore.update({
      collection: "users",
      doc: this.props.uid
    }, {
      ["cart." + this.props.productId + "." + this.state.variant]:
        this.props.cart[this.props.productId][this.state.variant] > 1 ? 
          this.props.firestore.FieldValue.increment(-1) :
          this.props.firestore.FieldValue.delete()
    });
  }

  render() {
    const variants = [];

    for (const v in this.props.variants) {
      variants.push(
        <option value={v} key={v}>
          {this.props.variants[v].size + " " + this.props.unit}
        </option>
      );
    }

    return isLoaded(this.props.variants) ? (
      <div className="productCard">
        <span className="badge badge-success">{this.props.tag}</span>
        <div className="imageContainer">
          <img src={this.props.image} alt={this.props.image_alt} />
        </div>
        <p className="productName">{this.props.name}</p>
        <div className="row mt-1">
          <div className="col-6">
            <p className="productPrice">
              ₹ {this.props.variants[this.state.variant].actualPrice}
            </p>
          </div>
          <div className="col-6 align-items-center float-right">
            <select className="custom-select custom-select-sm shadow-none" onChange={this.changeVariant}>
              {variants}
            </select>
          </div>
          <div className="col-2 pt-3 text-center">
            <span
              className={(this.state.wishlisted ? "fas" : "far") + " fa-heart"}
              onClick={this.toggleWishlist}
            ></span>
          </div>
          <div className="col-3 p-1 pt-2">
            <Link to={"/product/" + this.props.productId}>
              <button className="btn themeColorHoverBtn btn-block">
                VIEW
              </button>
            </Link>
          </div>
          <div className="col-7 p-1 pt-2 pr-3">
            {this.state.units > 0 ? (
              <InputStepper
                className="w-75 float-right"
                value={this.state.units}
                incrementHandler={this.increaseQty}
                decrementHandler={this.decreaseQty}
              />
            ) : (
              <button
                className="btn themeColorHoverBtn btn-block"
                onClick={this.increaseQty}
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    ) : null;
  }
}

const getQuery = ({ productId }) => [{
  collection: "products",
  doc: productId,
  subcollections: [{
    collection: "variants"
  }],
  storeAs: productId + "-variants"
}];

const mapStateToProps = (state, {productId}) => ({
  uid: state.firebase.auth.uid,
  cart: state.firebase.profile.cart,
  wishlist: state.firebase.profile.wishlist,
  ...state.firestore.data.products[productId],
  variants: state.firestore.data[productId + "-variants"]
});

export default compose(
  withFirebase,
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductCard);
