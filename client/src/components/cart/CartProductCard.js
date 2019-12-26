import React, { Component } from "react";
import { Link } from "react-router-dom";

class CartProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.product
    };
  }

  decUnits = e => {
    if (this.state.units - 1 === 0) {
      this.props.removeProductFromCart();
    } else {
      this.setState({
        units: this.state.units - 1
      });
    }
  };

  incUnits = e => {
    this.setState({
      units: this.state.units + 1
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
      <div className="cartProductCard">
        <div className="row">
          <div className="col-4 colInRow">
            <Link to="/product/12345">
              <div className="imageContainer">
                <img src={this.state.imageUrl} alt="Product " />
              </div>
            </Link>
          </div>
          <div className="col-8 colInRow">
            <span className="badge badge-success">{this.state.tag}</span>
            <p className="productName">{this.state.name}</p>
            <p className="productPrice">
              Rs. {this.state.rate[this.state.selectedQty][0]}
            </p>
            <span className="fas fa-times"></span>
            <div className="btn-group">
              <button
                type="button"
                className="btn themeColorHoverBtn"
                onClick={this.decUnits}
              >
                -
              </button>
              <button type="button" className="btn btn-outline-dark" disabled>
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
            <div className="cartFinalProductPrice">
              Rs.{" "}
              {this.state.rate[this.state.selectedQty][0] * this.state.units}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductCard;
