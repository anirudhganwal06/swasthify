import React, { Component } from "react";
import CategoryNav from "../common/CategoryNav";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  render() {
    return (
      <section id="productListSec">
        <CategoryNav />
        <div className="container">
          <div className="productListContainer">
            <b className="categoryName">Flours</b>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mt-3 mb-3">
                <ProductCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductList;
