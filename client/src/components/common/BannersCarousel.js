import React from "react";

function BannersCarousel() {
  return (
    <div className="container">
      <div className="carouselContainer">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/images/carouselBanner1.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="/images/carouselBanner2.jpg"
                alt="Second slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only"></span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BannersCarousel;
