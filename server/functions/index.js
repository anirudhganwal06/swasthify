const functions = require('firebase-functions');
const admin = require('firebase-admin');

const paytmChecksum = require('./paytm/checksum');
const paytmConfig = require('./paytm/config');

admin.initializeApp();

exports.placeOrder = functions.https.onRequest(async (req, res) => {
  const fs = admin.firestore();
  
  console.log(req.body);
  const paytmParams = {};
  paytmParams['MID'] = paytmConfig.MID;
  paytmParams['ORDER_ID'] = req.query.ORDER_ID;
  paytmParams['CUST_ID'] = 'CUST0001';
  paytmParams['INDUSTRY_TYPE_ID'] = paytmConfig.INDUSTRY_TYPE_ID;
  paytmParams['CHANNEL_ID'] = paytmConfig.CHANNEL_ID;
  paytmParams['TXN_AMOUNT'] = '1.00';
  paytmParams['WEBSITE'] = paytmConfig.WEBSITE;
  paytmParams['CALLBACK_URL'] = 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp';
  paytmParams['EMAIL'] = 'abc@gmail.com';
  paytmParams['MOBILE_NO'] = '9999999999';
  paytmChecksum.genchecksum(paytmParams, paytmConfig.MERCHANT_KEY, (err, checksum) => {
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
});