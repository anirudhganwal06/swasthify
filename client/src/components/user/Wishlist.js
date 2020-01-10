import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  removeFromWishlist = id => {
    this.props.firestore.update({
      collection: "users",
      doc: this.props.uid
    }, {
      wishlist: this.props.firestore.FieldValue.arrayRemove(id)
    });
  };

  fetchProducts = () => {
    const promises = [];
    this.props.wishlist.forEach(productId =>
      promises.push(this.props.firestore.doc("products/" + productId).get())
    );

    Promise.all(promises)
      .then(products =>
        this.setState({
          products: products.map(product => ({
            id: product.id,
            ...product.data()
          }))
        })
      )
      .catch(error => console.log("Error getting document:", error));
  };

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.fetchProducts();
  }

  render() {
    let productsList = [];
    const products = this.state.products;
    for (const product of products) {
      productsList.push(
        <div className="cartProductCard" key={product.id}>
          <button
            className="btn btn-outline-danger float-right"
            onClick={() => this.removeFromWishlist(product.id)}
          >
            <span className="fas fa-trash"></span>
          </button>
          <div className="row">
            <div className="col-4 colInRow">
              <Link to={"/product/" + product.id}>
                <div className="imageContainer">
                  <img src={product.image} alt="Product " />
                </div>
              </Link>
            </div>
            <div className="col-8 colInRow">
              <span className="badge badge-success">{product.tag}</span>
              <p className="productName">{product.name}</p>
              <p className="productName">
                {product.variants[0].size + " " + product.unit}
              </p>
              <p className="productPrice">
                {"₹ " + product.variants[0].actualPrice}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container p-3">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1>My Wishlist</h1>
          </div>
          <div className="col-12 col-md-8 mt-3">{productsList}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.firebase.auth.uid,
  wishlist: state.firebase.profile.wishlist
});

export default compose(connect(mapStateToProps), withFirestore)(Wishlist);
