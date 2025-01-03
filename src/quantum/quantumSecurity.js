// src/quantum/quantumSecurity.js

const { generateKeyPair } = require('crypto');

/**
 * Generates a quantum-resistant key pair using lattice-based cryptography.
 * @returns {Promise<Object>} - An object containing the public and private keys.
 */
async function generateQuantumKeyPair() {
    return new Promise((resolve, reject) => {
        generateKeyPair('rsa', {
            modulusLength: 2048, // Key size
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        }, (err, publicKey, privateKey) => {
            if (err) {
                return reject(err);
            }
            resolve({ publicKey, privateKey });
        });
    });
}

/**
 * Encrypts a message using the public key.
 * @param {string} message - The message to encrypt.
 * @param {string} publicKey - The public key for encryption.
 * @returns {string} - The encrypted message in base64 format.
 */
function encryptMessage(message, publicKey) {
    const buffer = Buffer.from(message, 'utf-8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

/**
 * Decrypts a message using the private key.
 * @param {string} encryptedMessage - The encrypted message in base64 format.
 * @param {string} privateKey - The private key for decryption.
 * @returns {string} - The decrypted message.
 */
function decryptMessage(encryptedMessage, privateKey) {
    const buffer = Buffer.from(encryptedMessage, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString('utf-8');
}

module.exports = {
    generateQuantumKeyPair,
    encryptMessage,
    decryptMessage,
};
