// src/tests/unit/governance.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Governance', function () {
    let Governance;
    let governance;
    let owner;

    beforeEach(async function () {
        Governance = await ethers.getContractFactory('Governance');
        governance = await Governance.deploy();
        await governance.deployed();
        owner = await ethers.getSigner();
    });

    it('Should create a proposal', async function () {
        await governance.createProposal('Proposal 1', 'Description of Proposal 1');
        const proposal = await governance.proposals(0);
        expect(proposal.title).to.equal('Proposal 1');
    });

    it('Should allow voting on a proposal', async function () {
        await governance.createProposal('Proposal 2', 'Description of Proposal 2');
        await governance.vote(0);
        const proposal = await governance.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it('Should not allow double voting', async function () {
        await governance.createProposal('Proposal 3', 'Description of Proposal 3');
        await governance.vote(0);
        await expect(govern ance.vote(0)).to.be.revertedWith('You have already voted on this proposal');
    });
});
