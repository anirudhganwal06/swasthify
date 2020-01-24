const functions = require('firebase-functions');

module.exports = functions.https.onRequest((req, res) => {
  const paytmParams = {};
  let checksumhash;

  for(const key in req.body) {
    if(key === "CHECKSUMHASH") {
      checksumhash = req.body[key];
    } else {
      paytmParams[key] = req.body[key];
    }
  }

  if(paytmChecksum.verifychecksum(paytmParams, paytmConfig.MERCHANT_KEY, checksumhash))
    return res.status(200).send("Success");
  else
    return res.status();
});