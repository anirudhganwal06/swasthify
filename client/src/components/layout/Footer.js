import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3">
              <h1 className="heading">CONTACT INFORMATION</h1>
              <h1 className="headingSm">ADDRESS</h1>
              <p>Faridabad</p>
              <h1 className="headingSm">PHONE</h1>
              <p>+91-9650308388</p>
              <h1 className="headingSm">EMAIL</h1>
              <a href="mailto:swasthifyutpaad@gmail.com">
                swasthifyutpaad@gmail.com
              </a>
              <h1 className="headingSm">WORKING DAYS/HOURS</h1>
              <p>Mon - Sat / 9:00AM - 6:00PM</p>
            </div>
            <div className="col-12 col-lg-9">
              <h1 className="heading">BE THE FIRST TO KNOW</h1>
              <div className="row">
                <div className="col-12 col-md-6">
                  <p>
                    Get all the latest information on Events, Sales and Offers.
                    <br />
                    Sign up for newsletter today.
                  </p>
                </div>
                <div className="col-12 col-md-6"></div>
              </div>
              <hr className="greyLine" />
              <h1 className="heading">MY ACCOUNT</h1>
              <div className="row justify-content-left">
                <div className="col-12 col-sm-6 col-md-3">
                  <a href="/about-us">About Us</a>
                  <br />
                  <a href="/about-us">Contact Us</a>
                  <br />
                  <a href="/about-us">My Account</a>
                  <br />
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <a href="/about-us">Order History</a>
                  <br />
                  <a href="/about-us">Advanced Search</a>
                  <br />
                  <a href="/about-us">Login</a>
                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="row text-center justify-content-center">
            <div className="col-12">
              <hr className="greyLine" />
            </div>
            <div className="col-9 col-sm-6 col-lg-3 m-3 m-lg-0 order-lg-2">
              <img
                id="paymentIcon"
                src="/assets/images/paymentIcon.webp"
                alt="Payment Methods"
              />
            </div>
            <div className="col-12 col-lg-9 order-lg-1">
              <p>Swasthify Corporation &copy; 2019. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
