import React from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { compose } from "redux";
import { connect } from "react-redux";
// import { firebaseConnect } from "react-redux-firebase";

const ProductCarousel = () => {
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

  return (
    <div className="container">
      <Carousel responsive={responsive}>
        <div>
          <ProductCard productId="flour-wheat" />
        </div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.firestore.ordered.products
});

// const getQuery = () => [
//   {
//     collection: "products",
//     where: [["category", "==", "flour"]]
//   }
// ];

export default compose(
  // firebaseConnect(getQuery),
  connect(mapStateToProps)
)(ProductCarousel);
