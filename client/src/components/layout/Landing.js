import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <section id="landingSec">
        <div className="container">
          <div className="categoriesContainer">
            <div className="row text-center justify-content-center">
              <div className="col-2">
                <a href="/products?category=flour">
                  <div className="categoryContainer">
                    <img
                      className="categoryIcon"
                      src="/images/floursIcon.jpeg"
                      alt="Flours"
                    />
                    <p>Flours</p>
                  </div>
                </a>
              </div>
              <div className="col-2">
                <a href="/products?category=rice">
                  <div className="categoryContainer">
                    <img
                      className="categoryIcon"
                      src="/images/riceIcon.png"
                      alt="Rice"
                    />
                    <p>Rice</p>
                  </div>
                </a>
              </div>
              <div className="col-2">
                <a href="/products?category=pulse">
                  <div className="categoryContainer">
                    <img
                      className="categoryIcon"
                      src="/images/pulsesIcon.jpg"
                      alt="Pulses"
                    />
                    <p>Pulses</p>
                  </div>
                </a>
              </div>
              <div className="col-2">
                <a href="/products?category=spice">
                  <div className="categoryContainer">
                    <img
                      className="categoryIcon"
                      src="/images/spicesIcon.png"
                      alt="Spices"
                    />
                    <p>Spices</p>
                  </div>
                </a>
              </div>
              <div className="col-2">
                <a href="/products?category=oil">
                  <div className="categoryContainer">
                    <img
                      className="categoryIcon"
                      src="/images/oilsIcon.jpeg"
                      alt="Oils"
                    />
                    <p>Oils</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="carouselContainer">
            <div
              id="carouselExampleControls"
              class="carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img
                    class="d-block w-100"
                    src="/images/carouselBanner1.jpg"
                    alt="First slide"
                  />
                </div>
                <div class="carousel-item active">
                  <img
                    class="d-block w-100"
                    src="/images/carouselBanner2.jpg"
                    alt="Second slide"
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only"></span>
              </a>
              <a
                class="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only"></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
