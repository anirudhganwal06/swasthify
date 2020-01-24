const paytmChecksum = require('../paytm/checksum');
const paytmConfig = require('../paytm/config');
const config = require('../config');

const { createOrder } = require('../orders');

module.exports = async (req, res) => {
  createOrder(req.body).then(({ user, order }) => {
    if(req.body.paymentMode === "COD")
      return res.redirect(config.frontendUrl + '/orders');

    const paytmParams = {
      MID: paytmConfig.MID,
      ORDER_ID: order.id,
      CUST_ID: req.body.uid,
      INDUSTRY_TYPE_ID: paytmConfig.INDUSTRY_TYPE_ID,
      CHANNEL_ID: paytmConfig.CHANNEL_ID,
      TXN_AMOUNT: String(user.cart.total),
      WEBSITE: paytmConfig.WEBSITE,
      CALLBACK_URL: 'https://us-central1-swasthify-6d5c2.cloudfunctions.net/verifyOrder',
      EMAIL: user.email,
      MOBILE_NO: user.mobileNo
    };

    console.log(paytmParams);
    return paytmChecksum.genchecksum(paytmParams, paytmConfig.MERCHANT_KEY, (err, checksum) => {
      if(err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      console.log('Checksum: ', checksum, "\n");
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html>');
      res.write('<head>');
      res.write('<title>Merchant Checkout Page</title>');
      res.write('</head>');
      res.write('<body>');
      res.write('<center><h1>Please do not refresh this page...</h1></center>');
      res.write('<form method="post" action="' + paytmConfig.URL + '" name="paytm_form">');
      for(var x in paytmParams)
        res.write('<input type="hidden" name="' + x + '" value="' + paytmParams[x] + '">');
      res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
      res.write('</form>');
      res.write('<script type="text/javascript">');
      res.write('document.paytm_form.submit();');
      res.write('</script>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  })
  .catch(err => console.log(err));
}