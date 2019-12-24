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
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductList;
