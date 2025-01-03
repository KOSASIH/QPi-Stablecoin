// src/tests/unit/QPiToken.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('QPiToken', function () {
    let QPiToken;
    let qpiToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        QPiToken = await ethers.getContractFactory('QPiToken');
        [owner, addr1, addr2] = await ethers.getSigners();
        qpiToken = await QPiToken.deploy();
        await qpiToken.deployed();
    });

    it('Should have the correct name and symbol', async function () {
        expect(await qpiToken.name()).to.equal('QPi');
        expect(await qpiToken.symbol()).to.equal('PI');
    });

    it('Should mint tokens to the owner', async function () {
        const ownerBalance = await qpiToken.balanceOf(owner.address);
        expect(await qpiToken.totalSupply()).to.equal(ownerBalance);
    });

    it('Should allow token transfers', async function () {
        await qpiToken.transfer(addr1.address, 50);
        const addr1Balance = await qpiToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);
    });

    it('Should allow burning tokens', async function () {
        await qpiToken.burn(50);
        const ownerBalance = await qpiToken.balanceOf(owner.address);
        expect(ownerBalance).to.equal(999999999999999999999999999999999999999999999950);
    });

    it('Should not allow transfer of more tokens than available', async function () {
        await expect(qpiToken.connect(addr1).transfer(addr2.address, 1)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });
});
