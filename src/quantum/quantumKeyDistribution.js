// src/quantum/quantumKeyDistribution.js

const { generateQuantumKeyPair, encryptMessage, decryptMessage } = require('./quantumSecurity');

/**
 * Performs Quantum Key Distribution (QKD) using a simplified approach.
 * @returns {Promise<Object>} - An object containing the keys and encrypted message.
 */
async function performQKD() {
    const { publicKey, privateKey } = await generateQuantumKeyPair();
    const message = "This is a secret message.";
    const encryptedMessage = encryptMessage(message, publicKey);
    const decryptedMessage = decryptMessage(encryptedMessage, privateKey);

    return {
        publicKey,
        privateKey,
        encryptedMessage,
        decryptedMessage,
    };
}

module.exports = {
    performQKD,
};
