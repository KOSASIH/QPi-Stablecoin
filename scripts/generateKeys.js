// scripts/generateKeys.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function generateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    // Save keys to files
    fs.writeFileSync(path.join(__dirname, '../keys/publicKey.pem'), publicKey.export({ type: 'spki', format: 'pem' }));
    fs.writeFileSync(path.join(__dirname, '../keys/privateKey.pem'), privateKey.export({ type: 'pkcs8', format: 'pem' }));

    console.log('Keys generated and saved to /keys directory');
}

generateKeys()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
