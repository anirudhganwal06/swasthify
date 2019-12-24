import React, { Component } from "react";

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      name: "Cold Pressed Coconut Oil",
      imageUrl: "/images/demoProduct.webp",
      rate: [
        [200, 1],
        [300, 2],
        [500, 5],
        [900, 10]
      ],
      unit: "lt",
      tag: "50% OFF",
      selectedQty: 0
    };
  }

  onChange = e => {
    this.setState({
      selectedQty: e.target.value
    });
  };

  render() {
    let qtyOptions = [];

    for (let i = 0; i < this.state.rate.length; i++) {
      qtyOptions.push(
        <option value={i}>
          {this.state.rate[i][1]} {this.state.unit}
        </option>
      );
    }

    return (
      <div className="col-3 mt-3 mb-3">
        <div className="productCard">
          <span class="badge badge-success">{this.state.tag}</span>
          <div class="imageContainer">
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
                <select class="custom-select" onChange={this.onChange}>
                  {qtyOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
