const admin = require('../firebase');

module.exports = async (data, context) => {
  try {
    const userRecord = await admin.auth().createUser(data);
    await admin.firestore().doc("users/" + userRecord.uid).set({
      displayName: data.displayName,
      email: data.email,
      mobileNo: data.phoneNumber,
      cart: {
        products: {},
        discount: 0,
        subTotal: 0,
        total: 0
      },
      wishlist: [],
      addresses: [],
      orders: [],
      totalOrderAmount: 0,
      couponsUsed: {},
      tags: []
    });

    return {success: true};
  } catch (error) {
    return {success: false};
  }
};