import React, { Component } from "react";
import CategoryNav from "../common/CategoryNav";

class Landing extends Component {
  render() {
    return (
      <section id="landingSec">
        <CategoryNav />
        {/*********************** Carousel ***************************/}
        <div className="container">
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
        {/******************** features container ************************/}
        <div className="featuresContainer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4 mt-3 mb-2 mt-sm-0 mb-sm-0">
                <div className="row">
                  <div className="col-2 col-sm-12 col-md-2">
                    <span className="fas fa-shipping-fast "></span>
                  </div>
                  <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                    <b>FREE SHIPPING & RETURN</b>
                    <p>Free shipping on all orders above ₹200/-</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2 mb-2 mt-sm-0 mb-sm-0">
                <div className="row">
                  <div className="col-2 col-sm-12 col-md-2">
                    <span className="fas fa-rupee-sign "></span>
                  </div>
                  <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                    <b>MONEY BACK GUARANTEE</b>
                    <p>100% money back guarantee.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2 mb-3 mt-sm-0 mb-sm-0">
                <div className="row">
                  <div className="col-2 col-sm-12 col-md-2">
                    <span className="fas fa-check "></span>
                  </div>
                  <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                    <b>100% NATURAL</b>
                    <p>
                      Fresh & Free from preservatives and all types of
                      chemicals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/****************** feature with banner container *******************/}
        <div className="featureswbContainer text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-9 col-sm-4 colOfRow">
                <div className="bannerContainer">
                  <div className="banner">
                    <img
                      className="bannerImage"
                      src="/images/featureBanner1.webp"
                      alt="Banner1"
                    />
                    <h1 class="bannerHeading">PREMIUM QUALITY</h1>
                    <p>
                      Our policy is to provide only the premium quality items to
                      our customers.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-9 col-sm-4 colOfRow">
                <div className="bannerContainer">
                  <div className="banner">
                    <img
                      className="bannerImage"
                      src="/images/featureBanner2.webp"
                      alt="Banner1"
                    />
                    <h1 class="bannerHeading">CHEMICAL FREE</h1>
                    <p>
                      All our items are 100% free from any and all kind
                      chemicals with
                      <br /> <b>No Added Colours & Preservative.</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-9 col-sm-4 colOfRow">
                <div className="bannerContainer">
                  <div className="banner">
                    <img
                      className="bannerImage"
                      src="/images/featureBanner3.webp"
                      alt="Banner1"
                    />
                    <h1 class="bannerHeading">FRESHLY DELIVERED</h1>
                    <p>
                      All items are Freshly Delivered at your Doorstep in click
                      of a button.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
