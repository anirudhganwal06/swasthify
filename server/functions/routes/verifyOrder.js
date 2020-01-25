const paytmChecksum = require('../paytm/checksum');
const paytmConfig = require('../paytm/config');
const updateOrder = require('../orders').updateOrder;
const config = require('../config');

module.exports = async (req, res) => {
  const paytmParams = {};
  let checksumhash;

  for(const key in req.body)
    if(key === "CHECKSUMHASH")
      checksumhash = req.body[key];
    else
      paytmParams[key] = req.body[key];

  if(paytmChecksum.verifychecksum(paytmParams, paytmConfig.MERCHANT_KEY, checksumhash)) {
    const orderParams = {
      TXNID: paytmParams.TXNID,
      BANKTXNID: paytmParams.BANKTXNID,
      paymentStatus: paytmParams.STATUS,
      deliveryStatus: "processing",
      TXNDATE: paytmParams.TXNDATE,
      GATEWAYNAME: paytmParams.GATEWAYNAME,
      BANKNAME: paytmParams.BANKNAME,
      PAYMENTMODE: paytmParams.PAYMENTMODE
    }

    await updateOrder(paytmParams.ORDERID, orderParams);
  }

  return res.redirect(config.frontendUrl + "/orders");
}