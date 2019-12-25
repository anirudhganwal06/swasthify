import React from "react";

function ShowcaseFeatures() {
  return (
    <div className="featuresContainer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 mt-3 mb-2 mt-sm-0 mb-sm-0">
            <div className="row">
              <div className="col-2 col-sm-12 col-md-2">
                <span className="fas fa-shipping-fast "></span>
              </div>
              <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                <b>FREE SHIPPING & RETURN</b>
                <p>Free shipping on all orders above ₹200/-</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 mt-2 mb-2 mt-sm-0 mb-sm-0">
            <div className="row">
              <div className="col-2 col-sm-12 col-md-2">
                <span className="fas fa-rupee-sign "></span>
              </div>
              <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                <b>MONEY BACK GUARANTEE</b>
                <p>100% money back guarantee.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 mt-2 mb-3 mt-sm-0 mb-sm-0">
            <div className="row">
              <div className="col-2 col-sm-12 col-md-2">
                <span className="fas fa-check "></span>
              </div>
              <div className="col-10 col-sm-12 col-md-10 col-xl-8">
                <b>100% NATURAL</b>
                <p>
                  Fresh & Free from preservatives and all types of chemicals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseFeatures;
