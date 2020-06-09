import { discountValue } from "./coupons";

export default (products, cart, coupon, user) => {
  let subTotal = 0, discount = 0, total = 0;
  
  for(const pid in cart.products)
    for(const v in cart.products[pid])
      if(products[pid])
        subTotal += products[pid].variants[v].discountedPrice * cart.products[pid][v];
  
  if(coupon)
    discount = discountValue(user, coupon, subTotal);
  
  total = subTotal - discount;
  return { subTotal, discount, total };
};