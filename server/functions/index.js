const functions = require('firebase-functions');
const admin = require('firebase-admin');

const paytmChecksum = require('./paytm/checksum');
const paytmConfig = require('./paytm/config');

admin.initializeApp();

exports.placeOrder = functions.https.onRequest(async (req, res) => {
  const fs = admin.firestore();

  const userDoc = await fs.doc('users/' + req.body.uid).get();
  const orderMetadataDoc = await fs.doc('orders/config').get();

  const user = userDoc.data();
  const orderMetadata = orderMetadataDoc.data();

  const paytmParams = {};
  paytmParams['MID'] = paytmConfig.MID;
  paytmParams['ORDER_ID'] = orderMetadata.prefix + ("00000000" + (Number(orderMetadata.lastOrder) + 1)).slice(-8);
  paytmParams['CUST_ID'] = req.body.uid;
  paytmParams['INDUSTRY_TYPE_ID'] = paytmConfig.INDUSTRY_TYPE_ID;
  paytmParams['CHANNEL_ID'] = paytmConfig.CHANNEL_ID;
  paytmParams['TXN_AMOUNT'] = String(user.cart.total);
  paytmParams['WEBSITE'] = paytmConfig.WEBSITE;
  paytmParams['CALLBACK_URL'] = 'https://us-central1-swasthify-6d5c2.cloudfunctions.net/verifyOrder';
  paytmParams['EMAIL'] = user.email;
  paytmParams['MOBILE_NO'] = user.mobileNo;
  console.log(paytmParams);
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

exports.verifyOrder = functions.https.onRequest((req, res) => {
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