const admin = require('firebase-admin');
const serviceConfig = require('./serviceConfig.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceConfig),
    databaseURL: "https://swanand-1958d.firebaseio.com"
});

module.exports = admin;