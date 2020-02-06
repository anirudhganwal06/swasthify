import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import queryString from "query-string";
import classnames from "classnames";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";
import punctuationMarks from "../common/punctuationMarks";

const ProductList = ({ products, location }) => {
  const queryParams = queryString.parse(location.search);
  const productList = isLoaded(products)
    ? products.map(product => (
        <div
          key={product.id}
          className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3"
        >
          <ProductCard collection="products" productId={product.id} />
        </div>
      ))
    : [];

  let pageTitle = "";
  if (queryParams.category) {
    pageTitle = "Category: " + queryParams.category;
  } else if (queryParams.search) {
    pageTitle = "Search: " + queryParams.search;
  } else {
    pageTitle = "Products";
  }

  return (
    <section id="productListSec">
      <div className="container productListContainer">
        <b
          className={classnames("categoryName", {
            "text-capitalize": queryParams.category
          })}
        >
          {pageTitle}
        </b>

        {isLoaded(products) ? (
          <div className="row justify-content-center">{productList}</div>
        ) : (
          loading("80px")
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  products: state.firestore.ordered.products
});

const getQuery = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  if (queryParams.category) {
    return [
      {
        collection: "products",
        where: [["category", "==", queryParams.category]]
      }
    ];
  } else if (queryParams.search) {
    let search = queryParams.search.trim();
    let nameWithoutPunc = "";
    for (let i in search) {
      if (punctuationMarks.includes(search[i])) {
        nameWithoutPunc += " ";
      } else {
        nameWithoutPunc += search[i].toLowerCase();
      }
    }
    let searchList = nameWithoutPunc.split(" ");
    console.log(searchList);
    return [
      {
        collection: "products",
        where: [["keywords", "array-contains-any", searchList]]
      }
    ];
  } else {
    return [
      // {
      //   collection: "products",
      //   where: [["unit", ">", 0]]
      // }
    ];
  }
};

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductList);
