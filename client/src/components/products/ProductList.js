import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductList = ({ products, match }) => {
  const productList = isLoaded(products) ?
    products.map(product => (
      <div
        key={product.id}
        className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3"
      >
        <ProductCard collection="products" productId={product.id} />
      </div>
    )) : [];

  return (
    <section id="productListSec">
      <div className="container productListContainer">
        <b className="categoryName text-capitalize">{match.params.category}</b>

        { isLoaded(products) 
          ? <div className="row justify-content-center">{productList}</div>
          : loading()
        }
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  products: state.firestore.ordered.products
});

const getQuery = ({ match }) => [{
  collection: "products",
  where: [["category", "==", match.params.category]]
}];

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductList);
