import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import queryString from "query-string";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductList = ({ products, location }) => {
  const queryParams = queryString.parse(location.search);
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
        <b className="categoryName text-capitalize">{queryParams.category}</b>

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

const getQuery = ({ location }) =>{
  const queryParams = queryString.parse(location.search);
  return(
    [{
      collection: "products",
      where: [["category", "==", queryParams.category]]
    }]
  );
};

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductList);
