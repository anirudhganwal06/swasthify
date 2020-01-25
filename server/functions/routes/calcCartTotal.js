const functions = require('firebase-functions');
const fs = require('../firebase').firestore();

module.exports = functions.firestore.document('users/{userId}')
  .onUpdate(async (change, context) => {
    if(JSON.stringify(change.after.data().cart) !== JSON.stringify(change.before.data().cart)) {
      
      const promises = [];
      const data = change.after.data().cart.products;
      const discount = change.after.data().cart.discount || 0;

      for (const product in data)
        promises.push(fs.doc('products/' + product).get());
      
      let total = 0;
      
      const result = await Promise.all(promises);
      
      result.forEach(actualProduct => {
        for (const product in data) {
          if (product === actualProduct.id) {
            for (const variant in data[product]) {
              total += actualProduct.data().variants[variant].actualPrice * data[product][variant];
            }
          }
        }
      });
      
      return fs.doc('users/' + context.params.userId).update({
        "cart.subTotal": total,
        "cart.discount": discount,
        "cart.total": total - discount
      });
    } else {
      return null;
    }
  });