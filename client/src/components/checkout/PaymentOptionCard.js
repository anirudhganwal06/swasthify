import React from "react";
import classnames from "classnames";

const paymentOptionCard = props => {
  return (
    <div className="col-4 mt-2 text-center">
      <div
        className={classnames("deliveryAddressCard", {
          selectedDeliveryAddressCard: props.selected
        })}
        onClick={() => props.onClick(props.name)}
        title={props.label}
      >
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default paymentOptionCard;
