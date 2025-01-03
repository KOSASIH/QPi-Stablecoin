// src/main/utils/cryptoUtils.js

const crypto = require('crypto');

/**
 * Generates a random cryptographic key.
 * @param {number} length - The length of the key in bytes.
 * @returns {string} - The generated key in hexadecimal format.
 */
function generateKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * Hashes a given input using SHA-256.
 * @param {string} input - The input to hash.
 * @returns {string} - The hashed output in hexadecimal format.
 */
function hashSHA256(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Verifies if a given hash matches the hash of the input.
 * @param {string} input - The input to verify.
 * @param {string} hash - The hash to compare against.
 * @returns {boolean} - True if the hash matches, false otherwise.
 */
function verifyHash(input, hash) {
    const computedHash = hashSHA256(input);
    return computedHash === hash;
}

module.exports = {
    generateKey,
    hashSHA256,
    verifyHash,
};
