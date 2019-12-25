import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      name: "Cold Pressed Coconut Oil",
      imageUrl: "/images/demoProduct.webp",
      rate: [
        [200, 100, "ml"],
        [300, 200, "ml"],
        [500, 1, "lt"],
        [900, 2, "lt"]
      ],
      tag: "50% OFF",
      selectedQty: 0,
      wishlisted: false,
      inCart: false
    };
  }

  onChange = e => {
    this.setState({
      selectedQty: e.target.value
    });
  };

  toggleWishlist = e => {
    this.setState({
      wishlisted: !this.state.wishlisted
    });
  };

  toggleCart = e => {
    this.setState({
      inCart: !this.state.inCart
    });
  };

  render() {
    let qtyOptions = [];

    for (let i = 0; i < this.state.rate.length; i++) {
      qtyOptions.push(
        <option value={i} key={i}>
          {this.state.rate[i][1] + " " + this.state.rate[i][2]}
        </option>
      );
    }

    return (
        <div className="productCard">
          <span className="badge badge-success">{this.state.tag}</span>
          <div className="imageContainer">
            <img src={this.state.imageUrl} alt="Product " />
          </div>
          <p className="productName">{this.state.name}</p>
          <div className="row mt-1">
            <div className="col-6">
              <p className="productPrice">
                Rs. {this.state.rate[this.state.selectedQty][0]}
              </p>
            </div>
            <div className="col-6 align-items-center">
              <div className="productQty">
                <select className="custom-select" onChange={this.onChange}>
                  {qtyOptions}
                </select>
              </div>
            </div>
            <div className="col-2 pt-3 text-center">
              {this.state.wishlisted ? (
                <span
                  className="fas fa-heart"
                  onClick={this.toggleWishlist}
                ></span>
              ) : (
                <span
                  className="far fa-heart"
                  onClick={this.toggleWishlist}
                ></span>
              )}
            </div>
            <div className="col-3 p-1 pt-2">
              <Link to="/product/123456">
                <button className="btn themeColorHoverBtn btn-block">
                  VIEW
                </button>
              </Link>
            </div>
            <div className="col-7 p-1 pt-2 pr-3">
              <button
                className="btn themeColorHoverBtn btn-block"
                onClick={this.toggleCart}
              >
                {this.state.inCart ? "ADDED TO CART" : "ADD TO CART"}
              </button>
            </div>
          </div>
      </div>
    );
  }
}

export default ProductCard;
