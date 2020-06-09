export default (products, cart) => {
  let subTotal = 0;
  
  for(const pid in cart.products)
    for(const v in cart.products[pid])
      if(products[pid])
        subTotal += products[pid].variants[v].discountedPrice * cart.products[pid][v];
  
  return subTotal;
};