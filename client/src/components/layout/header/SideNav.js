import React from "react";
import { Link } from "react-router-dom";
import { signedInLinks, signedOutLinks, extraLinks } from "./links";
import { isLoaded } from "react-redux-firebase";

const sideNav = props => {
  let links = [];
  let importedLinks = [];
  if (props.isSignedIn) {
    importedLinks = signedInLinks;
  } else {
    importedLinks = signedOutLinks;
  }

  for (let i in importedLinks) {
    if (importedLinks[i].url === "/logout") {
      for (let i in extraLinks) {
        links.push(
          <Link to={extraLinks[i].url} key={extraLinks[i].name}>
            <div className="sideNavLink pl-4">{extraLinks[i].name}</div>
          </Link>
        );
      }
    }
    links.push(
      <Link to={importedLinks[i].url} key={importedLinks[i].name}>
        <div className="sideNavLink pl-4">{importedLinks[i].name}</div>
      </Link>
    );
  }

  if(!props.isSignedIn) {
    for (let i in extraLinks) {
      links.push(
        <Link to={extraLinks[i].url} key={extraLinks[i].name}>
          <div className="sideNavLink pl-4">{extraLinks[i].name}</div>
        </Link>
      );
    }
  }

  let categoriesLinks = [];
  if (isLoaded(props.misc)) {
    const categories = props.misc.categories;
    for (let i in categories) {
      categoriesLinks.push(
        <Link to={"/products?category=" + categories[i]} key={categories[i]}>
          <div className="sideNavLink pl-4 text-left text-capitalize">{categories[i]}</div>
        </Link>
      );
    }
  }

  return (
    <div className="sideNavContainer">
      <div className="sideNav">
        <div className="sideNavHeading vCenterContents hCenterContents">
          <h1>My Account</h1>
        </div>
        <div className="sideNavLinks text-left">{links}</div>
        <hr />
        <div id="accordion">
          <div className="card">
            <div className="card-header sideNavLink pl-4 text-left" id="headingOne"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Categories
            </div>

            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                {categoriesLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sideNavEmptySpace" onClick={props.closeSideNav}></div>
    </div>
  );
};

export default sideNav;
