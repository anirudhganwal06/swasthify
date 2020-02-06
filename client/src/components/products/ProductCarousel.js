import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import classnames from "classnames";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductCarousel = props => {
  let productCardContainers = [];
  let productsPresent = false;
  if (isLoaded(props.products)) {
    if (!isEmpty(props.products)) {
      for (let i in props.products) {
        productCardContainers.push(
          <div
            className="p-1 h-100 float-left carouselProductCard"
            key={props.products[i].id}
          >
            <ProductCard
              collection={props.category}
              productId={props.products[i].id}
            />
          </div>
        );
      }
      productsPresent = true;
    } else {
      productsPresent = false;
    }
  }
  return (
    <div className={classnames("container", { "d-none": !productsPresent })}>
      <div className="productCarouselContainer">
        <div className="clearfix">
          <h3 className="text-capitalize mb-1 float-left themeHeadingLg ml-2">
            {props.category + "s" || props.tag}
          </h3>
          <Link
            to={
              "/products?" +
              (props.category ? "category=" : "tag=") +
              props.category
            }
          >
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
              {productCardContainers}
            </div>
          </div>
        ) : (
          loading("80px")
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, { category }) => ({
  products: state.firestore.ordered[category]
});

const getQuery = ({ category }) => {
  // console.log(category);
  return [
    {
      collection: "products",
      where: [["category", "==", category]],
      storeAs: category
    }
  ];
};

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductCarousel);
