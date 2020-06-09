import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLoaded, firestoreConnect } from "react-redux-firebase";

import BannersCarousel from "../common/BannersCarousel";
// import ShowcaseFeatures from "../common/ShowcaseFeatures";
import ShowcaseBanneredFeatures from "../common/ShowcaseBanneredFeatures";
import ProductsCarousel from "../products/ProductCarousel";
import loading from "../common/Loading";

class Landing extends Component {
  state = {
    loading: false,
  };

  componentDidMount = () => {
    if (isLoaded(this.props.misc)) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      if (isLoaded(this.props.misc)) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: true });
      }
    }
  };

  render() {
    const categoryProductCarousel = [];

    if (this.props.misc && this.props.misc.categories) {
      for (let i in this.props.misc.categories) {
        categoryProductCarousel.push(
          <ProductsCarousel
            category={this.props.misc.categories[i]}
            key={this.props.misc.categories[i]}
          />
        );
      }
    }

    return (
      <section id="landingSec">
        <BannersCarousel />
        {this.state.loading ? (
          loading("80px")
        ) : (
          <div>{categoryProductCarousel}</div>
        )}
        <ShowcaseBanneredFeatures />
        {/* <ShowcaseFeatures /> */}
      </section>
    );
  }
}

const getQuery = () => {
  return [
    {
      collection: "products",
      where: [["visible", "==", true]],
    },
  ];
};

const mapStateToProps = (state) => ({
  misc: state.firestore.data.misc,
});

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(Landing);
