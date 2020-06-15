import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import queryString from "query-string";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";
import getKeywords from "../../util/getKeywords";

const ProductList = ({ products, location }) => {
  const queryParams = queryString.parse(location.search);
  const productListJSX = [];
  if (isLoaded(products)) {
    products.sort((a, b) => {
      let aName = a.name.toLowerCase();
      let bName = b.name.toLowerCase();
      if (aName === bName) return 0;
      return aName < bName ? -1 : 1;
    });
    for (let product of products) {
      if (product.id !== "miscellaneous") {
        if (
          queryParams.category &&
          product.categories.includes(queryParams.category)
        ) {
          productListJSX.push(
            <div
              key={product.id}
              className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3"
            >
              <ProductCard product={product} />
            </div>
          );
        } else if (queryParams.search) {
          let searchList = getKeywords(queryParams.search);
          if (product.keywords.filter((value) => searchList.includes(value))) {
            productListJSX.push(
              <div
                key={product.id}
                className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3"
              >
                <ProductCard product={product} />
              </div>
            );
          }
        } else {
          productListJSX.push(
            <div
              key={product.id}
              className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3"
            >
              <ProductCard product={product} />
            </div>
          );
        }
      }
    }
  }

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
        <b className="categoryName">{pageTitle}</b>
        {isLoaded(products) ? (
          <div className="row justify-content-center">{productListJSX}</div>
        ) : (
          loading("80px")
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  products: state.firestore.ordered.products,
});

const getQuery = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  if (queryParams.category) {
    return [
      {
        collection: "products",
        where: [
          ["categories", "array-contains", queryParams.category],
          ["visible", "==", true],
        ],
      },
    ];
  } else if (queryParams.search) {
    let searchList = getKeywords(queryParams.search);
    console.log(searchList);
    return [
      {
        collection: "products",
        where: [
          ["keywords", "array-contains-any", searchList],
          ["visible", "==", true],
        ],
      },
    ];
  } else {
    return [
      {
        collection: "products",
        where: [["visible", "==", true]],
      },
    ];
  }
};

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductList);
