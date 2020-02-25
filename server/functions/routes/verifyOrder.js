const paytmChecksum = require('../paytm/checksum');
const paytmConfig = require('../paytm/config');
const updateOrder = require('../orders').updateOrder;
const config = require('../config');

module.exports = async (req, res) => {
  const paytmParams = {};
  let checksumhash;

  console.log(req.body);
  for(const key in req.body)
    if(key === "CHECKSUMHASH")
      checksumhash = req.body[key];
    else
      paytmParams[key] = req.body[key];

  if(paytmChecksum.verifychecksum(paytmParams, paytmConfig.MERCHANT_KEY, checksumhash)) {
    const orderParams = {
      BANKTXNID: paytmParams.BANKTXNID,
      paymentStatus: paytmParams.STATUS,
      TXNDATE: paytmParams.TXNDATE
    };
    
    if(paytmParams.STATUS === "TXN_SUCCESS") {
      orderParams["GATEWAYNAME"] = paytmParams.GATEWAYNAME;
      orderParams["BANKNAME"] = paytmParams.BANKNAME;
      orderParams["TXNID"] = paytmParams.TXNID;
      orderParams["PAYMENTMODE"] = paytmParams.PAYMENTMODE;
    }

    await updateOrder(paytmParams.ORDERID, orderParams);
  }

  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  return res.redirect(config.frontendUrl + "/orders");
}