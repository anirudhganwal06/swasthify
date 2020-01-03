import React, { Component } from "react";
import { Link } from "react-router-dom";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          name: "Cold Pressed Coconut Oil",
          image: "/images/demoProduct.webp",
          unit: "ml",
          variants: [
            {
              actualPrice: 200,
              comparePrice: 220,
              size: 100
            },
            {
              actualPrice: 300,
              comparePrice: 330,
              size: 200
            },
            {
              actualPrice: 500,
              comparePrice: 550,
              size: 1000
            },
            {
              actualPrice: 900,
              comparePrice: 980,
              size: 2000
            }
          ],
          tag: "50% OFF"
        },
        {
          name: "Cold Pressed Coconut Oil",
          image: "/images/demoProduct.webp",
          unit: "ml",
          variants: [
            {
              actualPrice: 200,
              comparePrice: 220,
              size: 100
            },
            {
              actualPrice: 300,
              comparePrice: 330,
              size: 200
            },
            {
              actualPrice: 500,
              comparePrice: 550,
              size: 1000
            },
            {
              actualPrice: 900,
              comparePrice: 980,
              size: 2000
            }
          ],
          tag: "50% OFF"
        },
        {
          name: "Cold Pressed Coconut Oil",
          image: "/images/demoProduct.webp",
          unit: "ml",
          variants: [
            {
              actualPrice: 200,
              comparePrice: 220,
              size: 100
            },
            {
              actualPrice: 300,
              comparePrice: 330,
              size: 200
            },
            {
              actualPrice: 500,
              comparePrice: 550,
              size: 1000
            },
            {
              actualPrice: 900,
              comparePrice: 980,
              size: 2000
            }
          ],
          tag: "50% OFF"
        }
      ]
    };
  }

  RemoveFromWishlist = index => {
    this.setState(prevState => {
      let newState = { ...prevState };
      newState.products.splice(index, 1);
      return { newState };
    });
  };

  render() {
    let productsList = [];
    const products = this.state.products;
    for (let i = 0; i < products.length; i++) {
      productsList.push(
        <div className="cartProductCard" key={i}>
          <button
            className="btn btn-outline-danger float-right"
            onClick={() => this.RemoveFromWishlist(i)}
          >
            <span className="fas fa-trash"></span>
          </button>
          <div className="row">
            <div className="col-4 colInRow">
              <Link to="/product/12345">
                <div className="imageContainer">
                  <img src={products[i].image} alt="Product " />
                </div>
              </Link>
            </div>
            <div className="col-8 colInRow">
              <span className="badge badge-success">{products[i].tag}</span>
              <p className="productName">{products[i].name}</p>
              <p className="productName">
                {products[i].variants[0].size + " " + products[i].unit}
              </p>
              <p className="productPrice">
                {"Rs. " + products[i].variants[0].actualPrice}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container p-3">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1>Wishlist</h1>
          </div>
          <div className="col-12 col-md-8 mt-3">{productsList}</div>
        </div>
      </div>
    );
  }
}

export default Wishlist;
