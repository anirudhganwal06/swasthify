import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase, firestoreConnect, isLoaded } from "react-redux-firebase";

import CategoryNav from "../common/CategoryNav";
import InputStepper from "../common/InputStepper";
import loading from "../common/Loading";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      variant: 0,
      wishlisted: false,
      units: 1,
      imageLoading: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    return isLoaded(props.wishlist)
      ? {
          ...state,
          wishlisted: props.wishlist.indexOf(props.match.params.prodId) !== -1
        }
      : state;
  }

  decUnits = () => {
    this.setState(({ units }) => ({
      units: units === 1 ? 1 : units - 1
    }));
  };

  incUnits = () => {
    this.setState(({ units }) => ({
      units: units + 1
    }));
  };

  selectVariant = e => {
    this.setState({
      variant: e.target.value
    });
  };

  toggleWishlist = () => {
    const firestore = this.props.firestore;
    firestore.update(
      {
        collection: "users",
        doc: this.props.uid
      },
      {
        wishlist: this.state.wishlisted
          ? firestore.FieldValue.arrayRemove(this.props.match.params.prodId)
          : firestore.FieldValue.arrayUnion(this.props.match.params.prodId)
      }
    );
  };

  addToCart = () => {
    this.props.firestore.update(
      {
        collection: "users",
        doc: this.props.uid
      },
      {
        ["cart." +
        this.props.match.params.prodId +
        "." +
        this.state.variant]: this.props.firestore.FieldValue.increment(
          this.state.units
        )
      }
    );
  };

  handleLoadedImage = () => {
    this.setState({ imageLoading: false });
  };

  render() {
    const qtyBtns = [];
    if (!isLoaded(this.props.variants, this.props.product)) {
      return loading();
    }

    for (const i in this.props.variants)
      qtyBtns.push(
        <button
          key={i}
          className={
            "btn qtySelectionBtn" +
            (+this.state.variant === +i ? " qtySelectedBtn" : "")
          }
          onClick={this.selectVariant}
          value={i}
        >
          {this.props.variants[i].size + " " + this.props.product.unit}
        </button>
      );

    return (
      <section className="productDetailsSec">
        <CategoryNav />
        <div className="container productDetailsContainer">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
              {this.state.imageLoading ? loading() : ""}
              <img
                className="productImage"
                src={this.props.product.image}
                alt={this.props.product.image_alt}
                onLoad={this.handleLoadedImage}
              />
            </div>
            <div className="col-12 col-md-6">
              <p className="productName">
                {this.props.product.name}
                <span
                  className={
                    (this.state.wishlisted ? "fas" : "far") + " fa-heart"
                  }
                  onClick={this.toggleWishlist}
                ></span>
              </p>
              <p className="productPrice">
                ₹ {this.props.variants[this.state.variant].actualPrice}
              </p>
              <p>Available in:</p>
              <span>{qtyBtns}</span>
              <br />
              <InputStepper
                value={this.state.units}
                incrementHandler={this.incUnits}
                decrementHandler={this.decUnits}
              />
              <button
                className="btn themeColorHoverBtn"
                onClick={this.addToCart}
              >
                ADD TO CART
              </button>
            </div>
            <div className="col-12 productDetail">
              <hr />
              <b className="showingDetail" data-detailtype="description">
                Description
              </b>
              <br />
              <p className="specificDetail">{this.props.product.desc}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const getQuery = ({ match }) => [
  {
    collection: "products",
    doc: match.params.prodId,
    storeAs: match.params.prodId
  },
  {
    collection: "products",
    doc: match.params.prodId,
    subcollections: [
      {
        collection: "variants"
      }
    ],
    storeAs: match.params.prodId + "-variants"
  }
];

const mapStateToProps = (state, { match }) => ({
  uid: state.firebase.auth.uid,
  cart: state.firebase.profile.cart,
  wishlist: state.firebase.profile.wishlist,
  product: state.firestore.data[match.params.prodId],
  variants: state.firestore.data[match.params.prodId + "-variants"]
});

export default compose(
  withFirebase,
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductDetails);
