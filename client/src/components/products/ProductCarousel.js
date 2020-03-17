import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import classnames from "classnames";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductCarousel = props => {
  let productCardsJSX = [];
  let productsPresent = false;
  if (isLoaded(props.products)) {
    for (let product of props.products) {
      if (product.categories.includes(props.category) && product.id !== "miscellaneous") {
        productCardsJSX.push(
          <div
            className="p-1 h-100 float-left carouselProductCard"
            key={product.id}
          >
            <ProductCard
              product={product}
            />
          </div>
        );
      }
    }
    if (productCardsJSX.length === 0) productsPresent = false;
    else productsPresent = true;
  }
  return (
    <div className={classnames("container", { "d-none": !productsPresent })}>
      <div className="productCarouselContainer">
        <div className="clearfix">
          <h3 className="text-capitalize mb-1 float-left themeHeadingLg ml-2">
            {"Category: " + props.category}
          </h3>
          <Link to={"/products?category=" + props.category}>
            <button className="btn themeColorHoverBtn btn-sm float-right">
              See All
            </button>
          </Link>
        </div>
        {isLoaded(props.products) ? (
          <div
            className="productCarouselMain"
            // responsive={responsive}
          >
            <div
              className="productCarouselMainScroll"
              style={{ width: props.products.length * 274 + "px" }}
            >
              {productCardsJSX}
            </div>
          </div>
        ) : (
          loading("80px")
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.firestore.ordered.products
});

const getQuery = ({ category }) => {
  return [
    {
      collection: "products",
      where: [["categories", "array-contains", category]]
    }
  ];
};

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductCarousel);
