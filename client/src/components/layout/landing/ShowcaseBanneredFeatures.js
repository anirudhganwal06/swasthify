import React from "react";

function ShowcaseBanneredFeatures() {
  return (
    <div className="featureswbContainer text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-9 col-sm-4 colOfRow">
            <div className="bannerContainer">
              <div className="banner">
                <img
                  className="bannerImage"
                  src="/images/featureBanner1.webp"
                  alt="Banner1"
                />
                <h1 className="bannerHeading">PREMIUM QUALITY</h1>
                <p>
                  Our policy is to provide only the premium quality items to our
                  customers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-9 col-sm-4 colOfRow">
            <div className="bannerContainer">
              <div className="banner">
                <img
                  className="bannerImage"
                  src="/images/featureBanner2.webp"
                  alt="Banner1"
                />
                <h1 className="bannerHeading">CHEMICAL FREE</h1>
                <p>
                  All our items are 100% free from any and all kind chemicals
                  with
                  <br /> <b>No Added Colours & Preservative.</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-9 col-sm-4 colOfRow">
            <div className="bannerContainer">
              <div className="banner">
                <img
                  className="bannerImage"
                  src="/images/featureBanner3.webp"
                  alt="Banner1"
                />
                <h1 className="bannerHeading">FRESHLY DELIVERED</h1>
                <p>
                  All items are Freshly Delivered at your Doorstep in click of a
                  button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseBanneredFeatures;
