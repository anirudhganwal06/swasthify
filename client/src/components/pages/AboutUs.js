import React, { Component } from "react";
import classnames from "classnames";
import loading from "../common/Loading";



class AboutUs extends Component {
  state = {
    loadingVideo: true
  };

  onVideoLoad = () => {
    this.setState({loadingVideo: false});
  };

  render() {

    return (
      <div className="container p-3 pb-3">
        <h1 className="text-center mb-4 themeHeadingLg">About Us</h1>
        {this.state.loadingVideo ? loading("80px") : ""}
        <div className={classnames("embed-responsive embed-responsive-16by9", { "d-none": this.state.loadingVideo })}>
          <iframe className="embeded-responsive-item" onLoad={this.onVideoLoad} title="Swasthify - About Us" src="https://www.youtube.com/embed/FcBb8FICL6A" allowFullScreen></iframe>
        </div>
        <p className="mt-3">Swasthify Utpaad Pvt Ltdstarted from the city of Faridabad with the idea that 80% problems occur from 20% of the reasons. Swasthify started in the year 2019 to provide mostly used kitchen items like Flours, Oils, Spices, etc. which are now processed in a way to maximize production at high speeds which are burning away the nutrition.</p>
        <p className="mt-3">We are a company working towards providing our customers Quality products processed using traditional processes like in our homes and we get what is best for our health.</p>
        <p className="mt-3">Join our cause and spread the awareness about Cold milled technology and the power of our traditional processes of our culture to all your Friends and Family members.</p>
      </div>
    );
  }
}

export default AboutUs;