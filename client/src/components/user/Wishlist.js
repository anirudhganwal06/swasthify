import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import loading from "../common/Loading";

class Wishlist extends Component {
  removeFromWishlist = id => {
    this.props.firestore.update(
      {
        collection: "users",
        doc: this.props.uid
      },
      {
        wishlist: this.props.firestore.FieldValue.arrayRemove(id)
      }
    );
  };

  // fetchProducts = () => {
  //   const promises = [];
  //   this.props.wishlist.forEach(productId =>
  //     promises.push(this.props.firestore.doc("products/" + productId).get())
  //   );

  //   Promise.all(promises)
  //     .then(products =>
  //       this.setState({
  //         products: products.map(product => ({
  //           id: product.id,
  //           ...product.data()
  //         })),
  //         loading: false
  //       })
  //     )
  //     .catch(error => console.log("Error getting document:", error));
  // };

  // componentDidMount() {
  //   this.fetchProducts();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) this.fetchProducts();
  // }

  render() {
    const productsList = [];
    const products = this.props.products;
    for (const pid in products) {
      productsList.push(
        <div className="cartProductCard" key={pid}>
          <button
            className="btn btn-outline-danger float-right"
            onClick={() => this.removeFromWishlist(pid)}
          >
            <span className="fas fa-trash"></span>
          </button>
          <div className="row">
            <div className="col-4 colInRow">
              <Link to={"/product/" + pid}>
                <div className="imageContainer">
                  <img src={products[pid].images[0]} alt="Product " />
                </div>
              </Link>
            </div>
            <div className="col-8 colInRow">
              <span className="badge badge-success">{products[pid].tag}</span>
              <p className="productName">{products[pid].name}</p>
              {/* <p className="productName">
                {products[pid].variants.size}
              </p>
              <p className="productPrice">
                {"₹ " + products[pid].variants[0].discountedPrice}
              </p> */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container p-3">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="themeHeadingLg">My Wishlist</h1>
          </div>
          {this.props.loading ? (
            loading("80px")
          ) : productsList.length === 0 ? (
            <div className="text-center">
              <span className="far fa-frown fa-5x pt-3"></span>
              <h5 className="text-center mt-3">No product in wishlist!</h5>
            </div>
          ) : (
            <div className="col-12 col-md-8 mt-3">{productsList}</div>
          )}
        </div>
      </div>
    );
  }
}

const addWishlistToProps = state => ({
  uid: state.firebase.auth.uid,
  wishlist: state.firebase.profile.wishlist
});

const getQuery = props => props.wishlist.map(pid => ({
  collection: "products",
  doc: pid
}));

const addProductsToProps = (state, props) => {
  const products = {};

  if(props.wishlist.length > 0 && !state.firestore.data.products)
    return {loading: true};

  for(const pid of props.wishlist) {
    if(!state.firestore.data.products[pid])
      return {loading: true};
    products[pid] = state.firestore.data.products[pid];
  }

  return {products, loading: false};
};

export default compose(
  connect(addWishlistToProps),
  firestoreConnect(getQuery),
  connect(addProductsToProps)
)(Wishlist);
