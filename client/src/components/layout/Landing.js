import React, { Component } from "react";

// import ProductCarousel from "../products/ProductCarousel";
import BannersCarousel from "../common/BannersCarousel";
// import ShowcaseFeatures from "../common/ShowcaseFeatures";
// import ShowcaseBanneredFeatures from "../common/ShowcaseBanneredFeatures";
import ProductsCarousel from "../products/ProductCarousel";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import loading from "../common/Loading";

class Landing extends Component {
  state = {
    loading: false
  };

  componentDidMount = () => {
    if (isLoaded(this.props.misc)) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
    }
  };

  componentDidUpdate = prevProps => {
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

    if (isLoaded(this.props.misc)) {
      for (let i in this.props.misc.categories) {
        // console.log(this.props.misc.categories[i]);
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
        {/* <ShowcaseBanneredFeatures /> */}
        {/* <ShowcaseFeatures /> */}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  misc:
    state.firestore.data.products &&
    state.firestore.data.products.miscellaneous
});

export default connect(mapStateToProps)(Landing);
