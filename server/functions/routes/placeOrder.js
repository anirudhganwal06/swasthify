const paytmChecksum = require('../paytm/checksum');
const paytmConfig = require('../paytm/config');
const config = require('../config');

const { createOrder } = require('../orders');

module.exports = async (req, res) => {
  if(!(req.body.uid && req.body.address && req.body.paymentMode))
    return res.status(400).send('Parameters missing');

  const { user, order } = await createOrder(req.body);

  if(req.body.paymentMode === "COD")
    return res.redirect(config.frontendUrl + '/orders');

  const paytmParams = {
    MID: paytmConfig.MID,
    ORDER_ID: order.id,
    CUST_ID: req.body.uid,
    INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
    CHANNEL_ID: paytmConfig.CHANNEL_ID,
    TXN_AMOUNT: String(order.data.total),
    WEBSITE: paytmConfig.WEBSITE,
    CALLBACK_URL: 'https://us-central1-swanand-1958d.cloudfunctions.net/verifyOrder',
    EMAIL: user.email || "",
    MOBILE_NO: user.mobileNo || ""
  };

  return paytmChecksum.genchecksum(paytmParams, paytmConfig.MERCHANT_KEY, (err, checksum) => {
    if(err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Merchant Checkout Page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<center><h1>Please do not refresh this page...</h1></center>');
    res.write('<form method="post" action="' + paytmConfig.URL + '" name="paytm_form">');
    for(const key in paytmParams)
      res.write('<input type="hidden" name="' + key + '" value="' + paytmParams[key] + '">');
    res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
    res.write('</form>');
    res.write('<script type="text/javascript">');
    res.write('document.paytm_form.submit();');
    res.write('</script>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  });
}