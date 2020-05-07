import React from "react";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const categoriesList = [];
  if (isLoaded(props.misc)) {
    for (let i of props.misc.categories) {
      categoriesList.push(
        <div className="col-6 col-sm-4 col-md-3" key={i}>
          <Link to={"/products?category=" + i} className="text-capitalize">
            {i}
          </Link>
        </div>
      );
    }
  }
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
            <h1 className="heading">Categories</h1>
            <div className="row justify-content-left">{categoriesList}</div>
          </div>
        </div>

        <div className="row text-center justify-content-center">
          <div className="col-12">
            <hr className="greyLine" />
          </div>
          {/* <div className="col-9 col-sm-6 col-lg-3 m-3 m-lg-0 order-lg-2">
              <img
                id="paymentIcon"
                src="/assets/images/paymentIcon.webp"
                alt="Payment Methods"
              />
            </div> */}
          <div className="col-12 col-lg-9 order-lg-1">
            <p>Swasthify Corporation &copy; 2019. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  misc: state.firestore.data.misc,
});

export default connect(mapStateToProps)(Footer);
