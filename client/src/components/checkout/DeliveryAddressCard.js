import React from "react";
import classnames from "classnames";

const deliveryAddressCard = props => {
  const addAddressContent = (
    <div className="deliveryAddressCard hCenterContents vCenterContents">
      <span className="fas fa-plus fa-5x"></span>
    </div>
  );
  const realAddressContent = (
    <div
      className={classnames("deliveryAddressCard", {
        selectedDeliveryAddressCard: props.selected
      })}
      onClick={() => props.onClick(props.index)}
    >
      <p>{props.houseNo + ", " + props.colony}</p>
      <p>{props.city}</p>
      <p>{props.state + " (" + props.pincode + ")"}</p>
    </div>
  );

  return (
    <div className="col-6 col-md-4 col-md-6 col-lg-4 mt-2">
      {props.addAddress ? addAddressContent : realAddressContent}
    </div>
  );
};

export default deliveryAddressCard;
