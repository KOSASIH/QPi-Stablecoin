// src/main/config.js

require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/qpi-stablecoin',
    ETH_NODE_URL: process.env.ETH_NODE_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    PRIVATE_KEY: process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY',
    CONTRACT_ADDRESSES: {
        QPiToken: process.env.QPI_TOKEN_ADDRESS || '0xYourQPiTokenAddress',
        StableValueMechanism: process.env.STABLE_VALUE_MECHANISM_ADDRESS || '0xYourStableValueMechanismAddress',
        Governance: process.env.GOVERNANCE_ADDRESS || '0xYourGovernanceAddress',
        MultiSigWallet: process.env.MULTISIG_WALLET_ADDRESS || '0xYourMultiSigWalletAddress',
    },
};

module.exports = config;
