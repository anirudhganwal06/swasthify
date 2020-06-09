export const discountValue = (user, coupon) => {

    case "Specific Tags":
      // If specific tags are eligible for coupon
      for (let tag of user.tags) {
        if (coupon.customers.includes(tag)) {
          chancesLeft = coupon.usageTimes;
          break;
        }
      }
      break;

        if (coupon.customers.includes(tag)) {
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
    if (
  if (user.couponsUsed && coupon.id in Object.keys(user.couponsUsed)) {
      coupon.minimumRequirementValue > user.cart.subTotal
    ) {
      return [0, true];
    }
    return [calcDiscount(user.cart.subTotal, coupon), true];
    if (
      coupon.minimumRequirementType === "Minimum Purchase Amount" &&
      coupon.minimumRequirementValue > user.cart.subTotal
    ) {
      return [0, true];
    }
    return [calcDiscount(user.cart.subTotal, coupon), true];


  return [0, false];
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

export const getCouponMessage = (coupon) => {
  let message = "Get ";

  if (coupon.type === "Percentage") message += coupon.value + "% discount";
  else if (coupon.type === "Fixed Amount")
    message += "₹ " + coupon.value + " off";


  if (coupon.minimumRequirementType === "Minimum Purchase Amount")
    message +=
      " on orders of ₹ " + coupon.minimumRequirementValue + " and above.";

  return message;
};

export { discountValue, getCouponMessage };