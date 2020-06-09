import React from "react";
import SelectFromOptions from "../common/SelectFromOptions";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import discountValue from "./discountValue";

const ApplicableCoupons = (props) => {
  const applicableCoupons = [];
  if (isLoaded(props.coupons, props.user)) {
    for (let coupon of props.coupons) {
      if (discountValue({ ...props.user, uid: props.uid }, coupon) !== 0) {
        applicableCoupons.push({
          name: coupon.code,
          id: coupon.id,
        });
      }
    }
  }

  return (
    <React.Fragment>
      {applicableCoupons.length === 0 ? (
        <p>No Coupon Applicable</p>
      ) : (
        <SelectFromOptions
          options={applicableCoupons}
          selectOption={props.selectCoupon}
          selectedOption={props.selectedCoupon}
        />
      )}
    </React.Fragment>
  );
};

const getQuery = () => [
  {
    collection: "coupons",
  },
];

const mapStateToProps = (state) => ({
  coupons: state.firestore.ordered.coupons,
  user: state.firebase.profile,
  uid: state.firebase.auth.uid,
});

export default compose(
  firestoreConnect(getQuery),
  connect(mapStateToProps)
)(ApplicableCoupons);