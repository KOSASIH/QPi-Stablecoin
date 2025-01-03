// scripts/deploy.js

const { ethers, upgrades } = require('hardhat');

async function main() {
    const QPiToken = await ethers.getContractFactory('QPiToken');
    const StableValueMechanism = await ethers.getContractFactory('StableValueMechanism');
    const Governance = await ethers.getContractFactory('Governance');
    const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet');

    // Deploy QPiToken
    const qpiToken = await QPiToken.deploy();
    await qpiToken.deployed();
    console.log(`QPiToken deployed to: ${qpiToken.address}`);

    // Deploy StableValueMechanism
    const stableValueMechanism = await StableValueMechanism.deploy(qpiToken.address);
    await stableValueMechanism.deployed();
    console.log(`StableValueMechanism deployed to: ${stableValueMechanism.address}`);

    // Deploy Governance
    const governance = await Governance.deploy();
    await governance.deployed();
    console.log(`Governance deployed to: ${governance.address}`);

    // Deploy MultiSigWallet
    const multiSigWallet = await MultiSigWallet.deploy([/* Add owner addresses here */], 2); // 2 required confirmations
    await multiSigWallet.deployed();
    console.log(`MultiSigWallet deployed to: ${multiSigWallet.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
