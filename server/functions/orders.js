const fs = require('./firebase').firestore();

exports.createOrder = async ({ uid, address, paymentMode }, onCreateComplete) => {
  const userDoc = await fs.doc('users/' + uid).get();
  const orderMetadataDoc = await fs.doc('orders/config').get();

  const user = userDoc.data();
  const orderMetadata = orderMetadataDoc.data();

  const order = {
    id: orderMetadata.prefix + ("00000000" + (Number(orderMetadata.lastOrder) + 1)).slice(-8),
    data: {
      address: user.addresses[address],
      discount: user.cart.discount,
      mobileNo: "+911234567890",
      orderDate: new Date(),
      paymentMethod: paymentMode,
      paymentStatus: "pending",
      subtotal: user.cart.subtotal,
      total: user.cart.total,
      user: userDoc.id
    }
  };

  const promises = [];

  for(const pid in user.cart.products)
    promises.push(fs.collection('products').doc(pid).get());

  return Promise.all(promises).then(products => {
    products.forEach(product => {
      for(const variant in product)
        order[product.id] = {
          [variant]: {
            price: product.data().variants[variant].actualPrice,
            quantity: user.cart.products[product.id][variant]
          }
        }
    });

    return fs.collection("orders").doc(order.id).set(order.data);
  })
  .then(() => ({ user, order }));
}