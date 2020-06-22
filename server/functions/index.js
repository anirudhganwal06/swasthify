const functions = require("firebase-functions");

exports.placeOrder = functions.https.onRequest(require("./routes/placeOrder"));
exports.verifyOrder = functions.https.onRequest(
  require("./routes/verifyOrder")
);
exports.sendMessage = functions.https.onRequest(
  require("./routes/sendMessage")
);
exports.addCustomer = functions.https.onCall(require("./routes/addCustomer"));
exports.getInvoice = functions.https.onCall(require("./routes/getInvoice"));