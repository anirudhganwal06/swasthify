import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import classnames from "classnames";

import loading from "../common/Loading";
import { setFlashMessage } from "../../actions/flashActions";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      variant: null,
      wishlisted: false,
      inCart: false,
      imageLoading: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    return isLoaded(props.wishlist, props.cart)
      ? {
          ...state,
          wishlisted: props.wishlist.indexOf(props.match.params.prodId) !== -1,
          inCart:
            !!props.cart.products[props.match.params.prodId] &&
            !!props.cart.products[props.match.params.prodId][state.variant],
        }
      : state;
  }

  componentDidMount() {
    if (isLoaded(this.props.product)) {
      this.setState({ variant: Object.keys(this.props.product.variants)[0] });
    }
  }

  selectVariant = e => {
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
            ? firestore.FieldValue.arrayRemove(this.props.match.params.prodId)
            : firestore.FieldValue.arrayUnion(this.props.match.params.prodId)
        }
      );
    } else
      this.props.setFlashMessage(true, "Please, login to use wishlist!", 3000);
  };

  addToCart = () => {
    if (this.props.uid)
      if (this.state.inCart) {
        console.log(this.props);
        if (
          Object.keys(this.props.cart.products[this.props.match.params.prodId])
            .length > 1
        ) {
          this.props.firestore.update(
            {
              collection: "users",
              doc: this.props.uid
            },
            {
              ["cart.products." +
              this.props.match.params.prodId +
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
              this.props.match.params
                .prodId]: this.props.firestore.FieldValue.delete()
            }
          );
        }
      } else {
        this.props.firestore.update(
          {
            collection: "users",
            doc: this.props.uid
          },
          {
            ["cart.products." +
            this.props.match.params.prodId +
            "." +
            this.state.variant]: this.props.firestore.FieldValue.increment(1)
          }
        );
      }
    else this.props.setFlashMessage(true, "Please, login to use cart!", 3000);
  };

  handleLoadedImage = () => {
    this.setState({ imageLoading: false });
  };

  render() {
    const qtyBtns = [];
    if (!isLoaded(this.props.product)) {
      return loading("80px");
    }

    for (const i in this.props.product.variants)
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
          {this.props.product.variants[i].size}
        </button>
      );
    return (
      <section className="productDetailsSec">
        <div className="container productDetailsContainer">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
              {this.state.imageLoading ? loading("80px") : ""}
              <img
                className={classnames("productImage", {
                  "d-none": this.state.imageLoading
                })}
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
                ₹{" "}
                {this.props.product.variants[this.state.variant]
                  ? this.props.product.variants[this.state.variant]
                      .discountedPrice
                  : 0}
              </p>
              <p>Available in:</p>
              <span>{qtyBtns}</span>
              <br />
              <button
                className="btn themeColorHoverBtn"
                onClick={this.addToCart}
              >
                {this.state.inCart ? "REMOVE FROM CART" : "ADD TO CART"}
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
    doc: match.params.prodId
  }
];

const mapStateToProps = (state, { match }) => ({
  uid: state.firebase.auth.uid,
  cart: state.firebase.profile.cart,
  wishlist: state.firebase.profile.wishlist,
  product:
    state.firestore.data.products &&
    state.firestore.data.products[match.params.prodId]
});

export default compose(
  withRouter,
  firestoreConnect(getQuery),
  connect(mapStateToProps, { setFlashMessage })
)(ProductDetails);
