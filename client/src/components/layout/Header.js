import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container-fluid">
          <div className="row text-center">
            <div className="col-2 headerColContainer">
              <a href="/">
                <div className="headerCol">
                  <img
                    id="swasthifyIcon"
                    src="/images/swasthifyLogo.webp"
                    alt="Swasthify"
                  />
                </div>
              </a>
            </div>
            <div className="col-8 headerColContainer">
              <div className="headerCol">
                <form>
                  <div className="row text-center justify-content-center">
                    <div className="col-8">
                      <input
                        type="text"
                        id="searchInput"
                        className="form-control"
                        placeholder="Search for products"
                      ></input>
                    </div>
                    <div className="col-1">
                      <button type="submit" className="btn btn-lg btn-primary">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-1 headerColContainer">
              <a href="/login">
                <div className="headerCol">
                  <span className="headerHeading">Login</span>
                </div>
              </a>
            </div>
            <div className="col-1 headerColContainer">
              <a href="/signup">
                <div className="headerCol">
                  <span className="headerHeading align-middle">Signup</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
