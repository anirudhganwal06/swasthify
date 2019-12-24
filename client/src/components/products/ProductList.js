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
            <b>Flour</b>
            <div className="row justify-content-left">
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
