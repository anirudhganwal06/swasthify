const functions = require('firebase-functions');
const fs = require('../firebase').firestore();

module.exports = functions.firestore.document('users/{userId}/cart')
    .onUpdate((change, context) => {
        console.log("YAS");
    });