// src/tests/unit/StableValueMechanism.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('StableValueMechanism', function () {
    let StableValueMechanism;
    let stableValueMechanism;
    let qpiToken;
    let owner;

    beforeEach(async function () {
        const QPiToken = await ethers.getContractFactory('QPiToken');
        qpiToken = await QPiToken.deploy();
        await qpiToken.deployed();

        StableValueMechanism = await ethers.getContractFactory('StableValueMechanism');
        stableValueMechanism = await StableValueMechanism.deploy(qpiToken.address);
        await stableValueMechanism.deployed();

        owner = await ethers.getSigner();
    });

    it('Should adjust supply when price is below target', async function () {
        await stableValueMechanism.adjustSupply(300000); // Simulate price below target
        const totalSupply = await qpiToken.totalSupply();
        expect(totalSupply).to.be.above(100000000000); // Check if supply increased
    });

    it('Should adjust supply when price is above target', async function () {
        await stableValueMechanism.adjustSupply(320000); // Simulate price above target
        const totalSupply = await qpiToken.totalSupply();
        expect(totalSupply).to.be.below(100000000000); // Check if supply decreased
    });
});
