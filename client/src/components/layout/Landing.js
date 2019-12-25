import React, { Component } from "react";

import CategoryNav from "../common/CategoryNav";
// import ProductCarousel from "../products/ProductCarousel";
import BannersCarousel from "../common/BannersCarousel";
import ShowcaseFeatures from "../common/ShowcaseFeatures";
import ShowcaseBanneredFeatures from "../common/ShowcaseBanneredFeatures";

class Landing extends Component {
  render() {
    return (
      <section id="landingSec">
        <CategoryNav />
        <BannersCarousel />
        <ShowcaseFeatures />
        {/* <ProductCarousel /> */}
        <ShowcaseBanneredFeatures />
      </section>
    );
  }
}

export default Landing;
