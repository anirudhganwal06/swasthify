import React from "react";
import { Link } from "react-router-dom";
import { signedInLinks, signedOutLinks } from "./links";

const sideNav = props => {
  let links = [];
  let importedLinks = [];
  if (props.isSignedIn) {
    importedLinks = signedInLinks;
  } else {
    importedLinks = signedOutLinks;
  }

  for (let i = 0; i < importedLinks.length; i++) {
    links.push(
      <Link to={importedLinks[i].url} key={i}>
        <div className="sideNavLink">{importedLinks[i].name}</div>
      </Link>
    );
  }

  return (
    <div className="sideNavContainer">
      <div className="sideNav">
        <div className="sideNavHeading vCenterContents hCenterContents">
          <h1>My Account</h1>
        </div>
        <div className="sideNavLinks">{links}</div>
      </div>
      <div className="sideNavEmptySpace" onClick={props.closeSideNav}></div>
    </div>
  );
};

export default sideNav;
