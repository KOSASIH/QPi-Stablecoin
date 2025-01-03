// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Governance is Ownable {
    struct Proposal {
        string title;
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;

    function createProposal(string memory title, string memory description) external onlyOwner {
        Proposal storage newProposal = proposals.push();
        newProposal.title = title;
        newProposal.description = description;
        newProposal.voteCount = 0;
        newProposal.executed = false;
    }

    function vote(uint256 proposalIndex) external {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.voters[msg.sender], "You have already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
    }

    function executeProposal(uint256 proposalIndex) external onlyOwner {
        Proposal storage proposal = proposals[proposalIndex];
        require(!proposal.executed, "Proposal already executed");
        proposal.executed = true;
        // Logic to execute the proposal
    }
}
