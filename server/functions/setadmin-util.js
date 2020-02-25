const admin = require('./firebase');

console.log('Setting admin');
admin.auth().setCustomUserClaims('9E6d2ewU2sX9lOoeTf3lb6w34iU2', { admin: true })
            .then(() => console.log('Admin Set!'))
            .finally(() => process.exit())
            .catch(err => console.err('Error: ', err));