import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, withFirestore } from "react-redux-firebase";
import classnames from "classnames";

import InputStepper from "../common/InputStepper";
import loading from "../common/Loading";

import { setFlashMessage } from "../../actions/flashActions";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      variant: Object.keys(props.variants)[0],
      units: 0,
      wishlisted: false,
      imageLoading: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    return isLoaded(props.cart, props.wishlist)
      ? {
          ...state,
          units:
            (props.cart.products &&
              props.cart.products[props.product.id] &&
              props.cart.products[props.product.id][state.variant]) ||
            0,
          wishlisted: props.wishlist.indexOf(props.product.id) !== -1
        }
      : state;
  }

  changeVariant = e => {
    this.setState({
      variant: e.target.value
    });
  };

  toggleWishlist = () => {
    if (this.props.uid) {
      const firestore = this.props.firestore;
      firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          wishlist: this.state.wishlisted
            ? firestore.FieldValue.arrayRemove(this.props.product.id)
            : firestore.FieldValue.arrayUnion(this.props.product.id)
        }
      );
    } else {
      this.props.setFlashMessage(true, "Please, login to use wishlist!", 3000);
    }
  };

  increaseQty = () => {
    if (this.props.uid) {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." +
          this.props.product.id +
          "." +
          this.state.variant]: this.props.firestore.FieldValue.increment(1)
        }
      );
    } else {
      this.props.setFlashMessage(true, "Please, login to use cart!", 3000);
    }
  };

  decreaseQty = () => {
    if (
      this.props.cart.products[this.props.product.id][this.state.variant] > 1
    ) {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." + this.props.product.id + "." + this.state.variant]:
            this.props.cart.products[this.props.product.id][
              this.state.variant
            ] - 1
        }
      );
    } else if (
      Object.keys(this.props.cart.products[this.props.product.id]).length > 1
    ) {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." +
          this.props.product.id +
          "." +
          this.state.variant]: this.props.firestore.FieldValue.delete()
        }
      );
    } else {
      this.props.firestore.update(
        {
          collection: "users",
          doc: this.props.uid
        },
        {
          ["cart.products." +
          this.props.product.id]: this.props.firestore.FieldValue.delete()
        }
      );
    }
  };

  handleLoadedImage = () => {
    this.setState({ imageLoading: false });
  };

  render() {
    const variants = [];

    for (const v in this.props.product.variants) {
      variants.push(
        <option value={v} key={v}>
          {this.props.product.variants[v].size}
        </option>
      );
    }

    return (
      <div className="productCard">
        {/* <span className="badge badge-success">{this.props.product.tag}</span> */}
        <div className="imageContainer">
          {this.state.imageLoading ? loading("80px") : ""}
          <img
            className={classnames({ "d-none": this.state.imageLoading })}
            src={this.props.product.image}
            alt={this.props.product.image_alt}
            onLoad={this.handleLoadedImage}
          />
        </div>
        <p className="productName">{this.props.product.name}</p>
        <div className="row mt-1">
          <div className="col-6">
            <p className="productPrice">
              ₹{" "}
              {this.props.product.variants[this.state.variant].discountedPrice}
            </p>
          </div>
          <div className="col-6 align-items-center float-right">
            <select
              className="custom-select custom-select-sm shadow-none"
              onChange={this.changeVariant}
            >
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
            <Link to={"/product/" + this.props.product.id}>
              <button className="btn themeColorHoverBtn btn-block">VIEW</button>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    cart: state.firebase.profile.cart,
    wishlist: state.firebase.profile.wishlist
  };
};

export default compose(
  withFirestore,
  withRouter,
  connect(mapStateToProps, { setFlashMessage })
)(ProductCard);
