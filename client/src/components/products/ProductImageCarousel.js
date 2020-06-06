import React, { Component } from "react";
import loading from "../common/Loading";
import classnames from "classnames";

export default class ProductImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true,
      imageShowing: 0
    };
  }

  handleLoadedImage = () => {
    this.setState({ imageLoading: false });
  };

  render() {
    let imageThumbnailsJSX = [];
    for (let i in this.props.images) {
      imageThumbnailsJSX.push(
        <img
          key={i}
          src={this.props.images[i]}
          alt={this.props.image_alt}
          onClick={() => {
            this.setState({ imageShowing: i });
          }}
        />
      );
    }

    return (
      <div>
        {this.state.imageLoading ? (
          loading("80px")
        ) : (
          <div className="productImageCarouselThumbnail">
            {imageThumbnailsJSX}
          </div>
        )}
        <img
          className={classnames("productImage", {
            "d-none": this.state.imageLoading,
          })}
          src={
            this.props.images[this.state.imageShowing] ||
            "/assets/images/noImageAvailable.jpg"
          }
          alt={this.props.image_alt}
          onLoad={this.handleLoadedImage}
        />
      </div>
    );
  }
}
