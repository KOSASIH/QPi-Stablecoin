// src/main/services/transactionService.js

const Web3 = require('web3');
const config = require('../config');
const { log } = require('../utils/logger');
const QPiToken = require('../artifacts/QPiToken.json'); // Assuming you have the ABI

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));

/**
 * Sends QPi tokens from one address to another.
 * @param {string} from - The sender's address.
 * @param {string} to - The recipient's address.
 * @param {number} amount - The amount of tokens to send.
 * @param {string} privateKey - The private key of the sender.
 * @returns {Promise<string>} - The transaction hash.
 */
async function sendTokens(from, to, amount, privateKey) {
    const contract = new web3.eth.Contract(QPiToken.abi, config.CONTRACT_ADDRESSES.QPiToken);
    const data = contract.methods.transfer(to, web3.utils.toWei(amount.toString(), 'ether')).encodeABI();

    const tx = {
        from,
        to: config.CONTRACT_ADDRESSES.QPiToken,
        data,
        gas: 2000000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    log(`Transaction successful: ${receipt.transactionHash}`);
    return receipt.transactionHash;
}

/**
 * Estimates the gas fee for a transaction.
 * @param {string} from - The sender's address.
 * @param {string} to - The recipient's address.
 * @param {number} amount - The amount of tokens to send.
 * @returns {Promise<number>} - The estimated gas fee.
 */
async function estimateGas(from, to, amount) {
    const contract = new web3.eth.Contract(QPiToken.abi, config.CONTRACT_ADDRESSES.QPiToken);
    const data = contract.methods.transfer(to, web3.utils.toWei(amount.toString(), 'ether')).encodeABI();

    const gasEstimate = await web3.eth.estimateGas({
        from,
        to: config.CONTRACT_ADDRESSES.QPiToken,
        data,
    });

    return gasEstimate;
}

module.exports = {
    sendTokens,
    estimateGas,
};
