import React from "react";
import { Link } from "react-router-dom";

function CategoryNav() {
  return (
    <div className="container">
      {/*********************** Category container ***************************/}
      <div className="categoriesContainer">
        <div className="row text-center justify-content-center">
          <div className="col-2">
            <Link to="/products/flour">
              <div className="categoryContainer">
                <img
                  className="categoryIcon"
                  src="/images/floursIcon.jpeg"
                  alt="Flours"
                />
                <p>Flours</p>
              </div>
            </Link>
          </div>
          <div className="col-2">
            <Link to="/products/rice">
              <div className="categoryContainer">
                <img
                  className="categoryIcon"
                  src="/images/riceIcon.png"
                  alt="Rice"
                />
                <p>Rice</p>
              </div>
            </Link>
          </div>
          <div className="col-2">
            <Link to="/products/pulse">
              <div className="categoryContainer">
                <img
                  className="categoryIcon"
                  src="/images/pulsesIcon.jpg"
                  alt="Pulses"
                />
                <p>Pulses</p>
              </div>
            </Link>
          </div>
          <div className="col-2">
            <Link to="/products/spice">
              <div className="categoryContainer">
                <img
                  className="categoryIcon"
                  src="/images/spicesIcon.png"
                  alt="Spices"
                />
                <p>Spices</p>
              </div>
            </Link>
          </div>
          <div className="col-2">
            <Link to="/products/oil">
              <div className="categoryContainer">
                <img
                  className="categoryIcon"
                  src="/images/oilsIcon.jpeg"
                  alt="Oils"
                />
                <p>Oils</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryNav;
