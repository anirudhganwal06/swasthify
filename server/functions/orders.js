const admin = require("./firebase");
const applyCoupon = require("./coupons");

const fs = admin.firestore();

exports.createOrder = async ({
  uid,
  reciever,
  mobileNo,
  address,
  paymentMode,
  couponId
}) => {
  const userDoc = await fs.doc("users/" + uid).get();
  const orderMetadataDoc = await fs.doc("orders/config").get();

  const user = userDoc.data();
  const orderMetadata = orderMetadataDoc.data();
  
  if (!reciever) reciever = user.displayName;
  
  const promises = [];
  
  for (const pid in user.cart.products)
    promises.push(fs.collection("products").doc(pid).get());
  
  const products = await Promise.all(promises);
  
  let subTotal = 0, discount = 0;
  
  products.forEach((product) => {
    for (const v in user.cart.products[product.id])
      subTotal +=
        product.data().variants[v].discountedPrice *
        user.cart.products[product.id][v];
  });

  if (couponId) {
    const couponDoc = await fs.doc("coupons/" + couponId).get();
    const coupon = { ...couponDoc.data(), id: couponDoc.id };
    discount = applyCoupon(coupon, user, subTotal);
  }

  const orderProducts = {};
  products.forEach((product) => {
    const productData = product.data();
    orderProducts[product.id] = {
      name: productData.name,
      image: productData.images[0],
      variants: {}
    };
    
    for (const variant in user.cart.products[product.id]) {
      orderProducts[product.id].variants[variant] = {
        ...productData.variants[variant],
        quantity: user.cart.products[product.id][variant]
      };
    }
  });
  
  const order = {
    id:
      orderMetadata.prefix +
      ("00000000" + (Number(orderMetadata.lastOrder) + 1)).slice(-8),
    data: {
      address: user.addresses[address],
      mobileNo: mobileNo,
      orderDate: admin.firestore.Timestamp.fromDate(new Date()),
      deliveryStatus: "NOT REVIEWED",
      paymentMethod: paymentMode,
      paymentStatus: "PENDING",
      products: orderProducts,
      subTotal: subTotal,
      discount: discount,
      total: subTotal - discount,
      reciever: reciever,
      user: userDoc.id
    }
  };

  const userDocChanges = {
    "cart.products": {},
    orders: admin.firestore.FieldValue.arrayUnion(order.id),
    totalOrderAmount: admin.firestore.FieldValue.increment(order.data.total)
  };

  if(discount)
    userDocChanges["couponsUsed." + couponId] = admin.firestore.FieldValue.increment(1);

  const batch = fs.batch();

  batch.update(fs.doc("orders/config"), {
    lastOrder: admin.firestore.FieldValue.increment(1)
  });
  batch.set(fs.doc("orders/" + order.id), order.data);
  batch.update(fs.doc("users/" + uid), userDocChanges);

  await batch.commit();
  return { user, order };
};

exports.updateOrder = (id, orderDetails) => {
  return fs.doc("orders/" + id).update(orderDetails);
};
