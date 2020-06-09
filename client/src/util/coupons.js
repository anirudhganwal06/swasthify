exports.discountValue =  (user, coupon) => {
  if (
    coupon.minimumRequirementType === "Minimum Purchase Amount" &&
    coupon.minimumRequirementValue > user.cart.subTotal
  ) {
    return 0;
  }

  let chancesLeft = 0;

  switch (coupon.customerEligibilityType) {
    case "Everyone":
      // If everyone is eligible for coupon
      chancesLeft = coupon.usageTimes;
      break;

    case "Specific Tags":
      // If specific tags are eligible for coupon
      for (let tag of user.tags) {
        if (tag in coupon.customers) {
          chancesLeft = coupon.usageTimes;
          break;
        }
      }
      break;

    case "Specific Customers":
      // If specific customers are eligible for coupon
      if (user.uid in coupon.customers) {
        chancesLeft = coupon.usageTimes;
      }
      break;

    default:
      return 0;
  }

  // How many times user has used the coupon before
  if (user.couponsUsed && coupon.id in Object.keys(user.couponsUsed)) {
    chancesLeft -= user.couponsUsed[coupon.id];
  }

  // If there are any left chances to use that coupon again
  if (chancesLeft > 0) {
    return calcDiscount(user.cart.subTotal, coupon);
  }
  return 0;
};

const calcDiscount = (cartSubTotal, coupon) => {
  switch (coupon.type) {
    case "Percentage":
      // Calculating the discount in percentage
      return parseInt((cartSubTotal * coupon.value) / 100);

    case "Fixed Amount":
      // Returning the fixed value
      return coupon.value;

    default:
      return 0;
  }
};

exports.getCouponMessage = coupon => {
  let message = "Get ";

  if(coupon.type === "Percentage")
    message += coupon.value + "% discount";
  else if(coupon.type === "Fixed Amount")
    message += "₹ " + coupon.value + " off";
  
  if(coupon.minimumRequirementType === "Minimum Purchase Amount")
    message += " on orders of ₹ " + coupon.minimumRequirementValue + " and above.";
  
  return message;
};