import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import ProductCard from "./ProductCard";
import loading from "../common/Loading";

const ProductCarousel = props => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
    
  return (
    <div className="container">
      <div className="productCarouselContainer">
        <div className="clearfix">
          <h3 className="text-capitalize mb-1 float-left">{props.category || props.tag}</h3>
          <Link to={"/" + (props.category ? "products/" : "tag/") + props.category}>
            <button className="btn themeColorHoverBtn btn-sm float-right">
            See All
            </button>
          </Link>
        </div>
        {isLoaded(props.products) ? (
          <Carousel responsive={responsive}>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
            <div className="p-1">
              <ProductCard
                collection={"products." + props.category}
                productId={props.products[0].id}
              />
            </div>
          </Carousel>
        ) : loading()}
      </div>
    </div>
  );
};

const mapStateToProps = (state, { category }) => ({
  products: state.firestore.ordered["products." + category]
});

const getQuery = ({ category }) => [{
  collection: "products",
  where: [["category", "==", category]],
  storeAs: "products." + category
}];

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ProductCarousel);
