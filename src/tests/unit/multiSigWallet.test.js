// src/tests/unit/multiSigWallet.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MultiSigWallet', function () {
    let MultiSigWallet;
    let multiSigWallet;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        MultiSigWallet = await ethers.getContractFactory('MultiSigWallet');
        multiSigWallet = await MultiSigWallet.deploy([owner.address, addr1.address], 2); // 2 required confirmations
        await multiSigWallet.deployed();
    });

    it('Should allow submitting a transaction', async function () {
        await multiSigWallet.submitTransaction(addr2.address, 100, '0x');
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.to).to.equal(addr2.address);
        expect(transaction.value.toString()).to.equal('100');
    });

    it('Should allow confirming a transaction', async function () {
        await multiSigWallet.submitTransaction(addr2.address, 100, '0x');
        await multiSigWallet.connect(addr1).confirmTransaction(0);
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.confirmations).to.equal(1);
    });

    it('Should execute a transaction after enough confirmations', async function () {
        await multiSigWallet.submitTransaction(addr2.address, 100, '0x');
        await multiSigWallet.connect(addr1).confirmTransaction(0);
        await multiSigWallet.connect(owner).confirmTransaction(0);
        const transaction = await multiSigWallet.transactions(0);
        expect(transaction.executed).to.be.true;
    });
});
