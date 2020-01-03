import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryNav extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          name: "Flours",
          urlName: "flour"
        },
        {
          name: "Rice",
          urlName: "rice"
        },
        {
          name: "Pulses",
          urlName: "pulse"
        },
        {
          name: "Spices",
          urlName: "spice"
        },
        {
          name: "Oils",
          urlName: "oil"
        }
      ]
    };
  }

  render() {
    let categoriesList = [];
    const categories = this.state.categories;
    for (let i = 0; i < categories.length; i++) {
      categoriesList.push(
        <div className="col-1" key={i}>
          <Link to={"/products?category=" + categories[i].urlName}>
            <div className="categoryContainer">
              {/* <img
                  className="categoryIcon"
                  src="/images/floursIcon.jpeg"
                  alt="Flours"
                /> */}
              <p>{categories[i].name}</p>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div className="container">
        {/*********************** Category container ***************************/}
        <div className="categoriesContainer">
          <div className="row text-center justify-content-around">
            {categoriesList}
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryNav;
