const functions = require("firebase-functions");

exports.placeOrder = functions.https.onRequest(require("./routes/placeOrder"));
exports.verifyOrder = functions.https.onRequest(require("./routes/verifyOrder"));
exports.calcCartTotal = functions.https.onRequest(require("./routes/calcCartTotal"));