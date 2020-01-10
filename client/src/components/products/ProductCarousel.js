import React from "react";
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
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const products = [];
  
  for(const product in props.products)
    products.push((
      <div>
        <ProductCard collection={props.collection} productId={product} />
      </div>
    ));
  return (
    <div className="container">
      {isLoaded(props.products) ? (
        <Carousel responsive={responsive}>
          {products}
        </Carousel>
      ) : loading()}
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.firestore.data.products
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
