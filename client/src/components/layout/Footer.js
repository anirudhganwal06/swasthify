import React from "react";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const categoriesList = [];
  if (isLoaded(props.misc)) {
    for (let i of props.misc.categories) {
      categoriesList.push(
        <div className="col-6 col-sm-4 col-lg-6" key={i}>
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
          <div className="col-12 col-lg-3">
            <h1 className="heading">Categories</h1>
            <div className="row justify-content-left">{categoriesList}</div>
          </div>
          <div className="col-12 col-lg-6">
            <h1 className="heading">Location</h1>
            <iframe
              id="locationIframe"
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14036.430008638943!2d77.3114961!3d28.4160129!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd97c322703b%3A0x5a66b6ec50ac952b!2sswanand%20vikriya%20kendra!5e0!3m2!1sen!2sin!4v1590166348794!5m2!1sen!2sin"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>

        <div className="row text-center justify-content-center">
          <div className="col-12">
            <hr className="greyLine" />
          </div>
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
