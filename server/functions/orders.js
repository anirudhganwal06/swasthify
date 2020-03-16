const admin = require('./firebase');

const fs = admin.firestore();

exports.createOrder = async ({ uid, reciever, address, paymentMode }) => {
  const userDoc = await fs.doc('users/' + uid).get();
  const orderMetadataDoc = await fs.doc('orders/config').get();

  const user = userDoc.data();
  const orderMetadata = orderMetadataDoc.data();

  if (!reciever)
    reciever = user.displayName;

  const order = {
    id: orderMetadata.prefix + ("00000000" + (Number(orderMetadata.lastOrder) + 1)).slice(-8),
    data: {
      address: user.addresses[address],
      discount: user.cart.discount,
      mobileNo: "+911234567890",
      orderDate: admin.firestore.Timestamp.fromDate(new Date()),
      deliveryStatus: "NOT REVIEWED",
      paymentMethod: paymentMode,
      paymentStatus: "PENDING",
      subTotal: user.cart.subTotal,
      total: user.cart.total,
      products: {},
      reciever: reciever,
      user: userDoc.id
    }
  };

  const promises = [];

  for(const pid in user.cart.products)
  promises.push(fs.collection('products').doc(pid).get());

  const products = await Promise.all(promises)

  products.forEach(product => {
    for(const variant in user.cart.products[product.id]) {
      const productData = product.data();
      if(!order.data.products[product.id])
        order.data.products[product.id] = {
          name: productData.name,
          image: productData.image,
          category: productData.category,
          variants: []
        };

      order.data.products[product.id].variants.push({
        ...productData.variants[variant],
        quantity: user.cart.products[product.id][variant]
      });
    }
  });
  
  const batch = fs.batch();

  batch.update(fs.doc('orders/config'), { lastOrder: admin.firestore.FieldValue.increment(1) });
  batch.set(fs.doc("orders/" + order.id), order.data);
  batch.update(fs.doc("users/" + uid), {
    "cart.products": {},
    "orders": admin.firestore.FieldValue.arrayUnion(order.id)
  });

  await batch.commit();
  return { user, order };
}

exports.updateOrder = (id, orderDetails) => {
  return fs.doc('orders/' + id).update(orderDetails);
}