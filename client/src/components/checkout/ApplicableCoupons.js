import React from "react";
import SelectFromOptions from "../common/SelectFromOptions";
import { compose } from "redux";
import { isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { discountValue, getCouponMessage } from "../../util/coupons";

const ApplicableCoupons = (props) => {
  const applicableCoupons = [];
  if (isLoaded(props.coupons, props.user)) {
    for (let couponId in props.coupons) {
      const coupon = props.coupons[couponId];
      const [discount, show] = discountValue(
        { ...props.user, uid: props.uid },
        coupon
      );
      if (show) {
        applicableCoupons.push({
          name: coupon.code,
          id: couponId,
          disabled: discount === 0,
          info: getCouponMessage(coupon),
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

const mapStateToProps = (state) => ({
  user: state.firebase.profile,
  uid: state.firebase.auth.uid,
});

export default compose(
  connect(mapStateToProps)
)(ApplicableCoupons);
