// src/main/services/governanceService.js

const Web3 = require('web3');
const config = require('../config');
const { log } = require('../utils/logger');
const Governance = require('../artifacts/Governance.json'); // Assuming you have the ABI

const web3 = new Web3(new Web3.providers.HttpProvider(config.ETH_NODE_URL));

/**
 * Creates a new governance proposal.
 * @param {string} title - The title of the proposal.
 * @param {string} description - The description of the proposal.
 * @param {string} privateKey - The private key of the proposer.
 * @returns {Promise<string>} - The transaction hash of the proposal creation.
 */
async function createProposal(title, description, privateKey) {
    const contract = new web3.eth.Contract(Governance.abi, config.CONTRACT_ADDRESSES.Governance);
    const data = contract.methods.createProposal(title, description).encodeABI();

    const tx = {
        from: web3.eth.accounts.privateKeyToAccount(privateKey).address,
        to: config.CONTRACT_ADDRESSES.Governance,
        data,
        gas: 2000000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    log(`Proposal created: ${receipt.transactionHash}`);
    return receipt.transactionHash;
}

/**
 * Votes on a governance proposal.
 * @param {number} proposalIndex - The index of the proposal to vote on.
 * @param {string} privateKey - The private key of the voter.
 * @returns {Promise<string>} - The transaction hash of the vote.
 */
async function vote(proposalIndex, privateKey) {
    const contract = new web3.eth.Contract(Governance.abi, config.CONTRACT_ADDRESSES.Governance);
    const data = contract.methods.vote(proposalIndex).encodeABI();

    const tx = {
        from: web3.eth.accounts.privateKeyToAccount(privateKey).address,
        to: config.CONTRACT_ADDRESSES.Governance,
        data,
        gas: 2000000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey );
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    log(`Vote casted for proposal ${proposalIndex}: ${receipt.transactionHash}`);
    return receipt.transactionHash;
}

module.exports = {
    createProposal,
    vote,
};
