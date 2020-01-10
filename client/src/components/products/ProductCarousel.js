import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { firebaseConnect } from "react-redux-firebase";

const ProductCarousel = (props) => {
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
      <div className="productCarouselContainer">
        <div className="clearfix">
          <h3 className="text-capitalize mb-1 float-left">{props.category || props.tag}</h3>
          <Link to={"/" + (props.category ? "category/" : "tag/") + props.category}>
            <button className="btn themeColorHoverBtn btn-sm float-right">
            See All
            </button>
          </Link>
        </div>
        <Carousel responsive={responsive}>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
          <div className="p-1">
            <ProductCard productId={props.products[0].id} />
          </div>
        </Carousel>
      </div>
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
