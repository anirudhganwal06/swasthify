const admin = require('firebase-admin');
const serviceConfig = require('./serviceConfig.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceConfig),
    databaseURL: "https://swasthify-6d5c2.firebaseio.com"
});

module.exports = admin;