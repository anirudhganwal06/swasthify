import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

const deliveryAddressCard = props => {
  const addAddressContent = (
    <Link to="/address/add">
      <div className="deliveryAddressCard hCenterContents vCenterContents">
        <span className="fas fa-plus fa-5x"></span>
      </div>
    </Link>
  );
  const realAddressContent = props.edit ? (
    <Link to={"/address/" + props.index + "/edit"}>
      <div
        className={classnames("deliveryAddressCard", {
          selectedDeliveryAddressCard: props.selected
        })}
      >
        <p>{props.line1 + ","}</p>
        <p>{props.line2 + ","}</p>
        <p>{props.city + " (" + props.pincode + ")"}</p>
      </div>
    </Link>
  ) : (
    <div
      className={classnames("deliveryAddressCard", {
        selectedDeliveryAddressCard: props.selected
      })}
      onClick={() => props.onClick(props.index)}
    >
      <p>{props.line1 + ","}</p>
      <p>{props.line2 + ","}</p>
      <p>{props.city + " (" + props.pincode + ")"}</p>
    </div>
  );

  return (
    <div className="col-6 col-md-4 col-md-6 col-lg-4 mt-2">
      <div
        className={classnames({
          "h-100": props.addAddress
        })}
      >
        {props.addAddress ? addAddressContent : realAddressContent}
      </div>
      <div>
        {props.delete && !props.addAddress ? (
          <button
            className="btn btn-block themeColorHoverBtn mt-2"
            onClick={e => props.deleteAddress(e, props.index)}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default deliveryAddressCard;
