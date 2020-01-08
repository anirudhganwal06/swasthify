import React, { Component } from "react";

// import ProductCarousel from "../products/ProductCarousel";
import BannersCarousel from "./BannersCarousel";
import ShowcaseFeatures from "./ShowcaseFeatures";
import ShowcaseBanneredFeatures from "./ShowcaseBanneredFeatures";

class Landing extends Component {
  render() {
    return (
      <section id="landingSec">
        <BannersCarousel />
        <ShowcaseFeatures />
        {/* <ProductCarousel /> */}
        <ShowcaseBanneredFeatures />
      </section>
    );
  }
}

export default Landing;
