import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import classnames from "classnames";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductCarousel = props => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 992 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 991, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 767, min: 501 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1
    }
  };

  let productCardContainers = [];
  let productsPresent = false;
  if (isLoaded(props.products)) {
    if (!isEmpty(props.products)) {
      for (let i in props.products) {
        productCardContainers.push(
          <div className="p-1 h-100" key={props.products[i].id}>
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
    <div className={classnames("container", {"d-none": !productsPresent})}>
        <div className="productCarouselContainer">
          <div className="clearfix">
            <h3 className="text-capitalize mb-1 float-left">
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
          <Carousel
            responsive={responsive}
          >
            {console.log("productCardContainers")}
            {productCardContainers}
          </Carousel>
          {isLoaded(props.products) ? "" : loading()}
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
