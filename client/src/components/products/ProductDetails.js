import React, { Component } from "react";
import CategoryNav from "../common/CategoryNav";

class ProductDetails extends Component {
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
      inCart: false,
      units: 1,
      detail: {
        description:
          "Coconut oil is a source of many oleochemicals such as fatty acids, methyl esters, and fatty alcohol. For cooking purposes, it is commonly used in the form of filtered coconut oil. Virgin coconut oil, which is high-quality oil, is prepared from the milk extracted from the raw kernel.",
        reviews: "The product is rated 4.8 stars!",
        shipping:
          "The product will be Delivered within 2-3 Working Days After successful completion of your order."
      },
      showingDetail: "description"
    };
  }

  showSpecificDetail = e => {
    this.setState({
      showingDetail: e.target.dataset.detailtype
    });
  };

  decUnits = e => {
    this.setState({
      units: this.state.units - 1 === 0 ? 1 : this.state.units - 1
    });
  };

  incUnits = e => {
    this.setState({
      units: this.state.units + 1
    });
  };

  selectQty = e => {
    this.setState({
      selectedQty: +e.target.value
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
    let qtyBtns = [];
    for (let i = 0; i < this.state.rate.length; i++) {
      qtyBtns.push(
        this.state.selectedQty === i ? (
          <button
            key={i}
            className="btn qtySelectionBtn qtySelectedBtn"
            onClick={this.selectQty}
            value={i}
          >
            {this.state.rate[i][1] + " " + this.state.rate[i][2]}
          </button>
        ) : (
          <button
            key={i}
            className="btn qtySelectionBtn"
            onClick={this.selectQty}
            value={i}
          >
            {this.state.rate[i][1] + " " + this.state.rate[i][2]}
          </button>
        )
      );
    }

    return (
      <section className="productDetailsSec">
        <CategoryNav />
        <div className="container">
          <div className="productDetailsContainer">
            <div className="row">
              <div className="col-12 col-md-6 text-center">
                <img
                  className="productImage"
                  src="/images/demoProduct.webp"
                  alt="Product"
                />
              </div>
              <div className="col-12 col-md-6">
                <p className="productName">
                  {this.state.name}
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
                </p>
                <p className="productPrice">
                  Rs. {this.state.rate[this.state.selectedQty][0]}
                </p>
                <p>Available in:</p>
                {qtyBtns}
                <br />
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn themeColorHoverBtn"
                    onClick={this.decUnits}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    disabled
                  >
                    {this.state.units}
                  </button>
                  <button
                    type="button"
                    className="btn themeColorHoverBtn"
                    onClick={this.incUnits}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn themeColorHoverBtn"
                  onClick={this.toggleCart}
                >
                  {this.state.inCart ? "ADDED TO CART" : "ADD TO CART"}
                </button>
              </div>
              <div className="col-12 productDetail">
                <hr />
                <b
                  className={
                    this.state.showingDetail === "description"
                      ? "showingDetail"
                      : ""
                  }
                  onClick={this.showSpecificDetail}
                  data-detailtype="description"
                >
                  Description
                </b>
                <b
                  className={
                    this.state.showingDetail === "reviews"
                      ? "showingDetail"
                      : ""
                  }
                  onClick={this.showSpecificDetail}
                  data-detailtype="reviews"
                >
                  Reviews
                </b>
                <b
                  className={
                    this.state.showingDetail === "shipping"
                      ? "showingDetail"
                      : ""
                  }
                  onClick={this.showSpecificDetail}
                  data-detailtype="shipping"
                >
                  Shipping & Delivery
                </b>
                <br />
                <p className="specificDetail">
                  {this.state.detail[this.state.showingDetail]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductDetails;
