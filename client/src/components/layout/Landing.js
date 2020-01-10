import React, { Component } from "react";

// import ProductCarousel from "../products/ProductCarousel";
import BannersCarousel from "../common/BannersCarousel";
import ShowcaseFeatures from "../common/ShowcaseFeatures";
import ShowcaseBanneredFeatures from "../common/ShowcaseBanneredFeatures";
import ProductsCarousel from "../products/ProductCarousel";

class Landing extends Component {
  render() {
    return (
      <section id="landingSec">
        <ProductsCarousel category="flour" />
        <BannersCarousel />
        <ShowcaseFeatures />
        {/* <ProductCarousel /> */}
        <ShowcaseBanneredFeatures />
      </section>
    );
  }
}

export default Landing;
