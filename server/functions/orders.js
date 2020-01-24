const admin = require('./firebase');

const fs = admin.firestore();

exports.createOrder = async ({ uid, address, paymentMode }) => {
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
      subTotal: user.cart.subTotal,
      total: user.cart.total,
      user: userDoc.id
    }
  };

  fs.doc('orders/config').update({
    lastOrder: admin.firestore.FieldValue.increment(1)
  });

  const promises = [];

  for(const pid in user.cart.products)
    promises.push(fs.collection('products').doc(pid).get());

  const products = await Promise.all(promises)
  
  products.forEach(product => {
    for(const variant in product.data().variants)
      order.data[product.id] = {
        [variant]: {
          price: product.data().variants[variant].actualPrice,
          quantity: user.cart.products[product.id][variant]
        }
      }
  });

  const batch = fs.batch();
  batch.set(fs.doc("orders/" + order.id), order.data);
  batch.update(fs.doc("users/" + uid), { cart: {} })

  await batch.commit();
  return { user, order };
}

exports.updateOrder = orderDetails => {
  return fs.doc('orders/' + id).update(orderDetails);
}