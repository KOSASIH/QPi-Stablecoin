// src/main/models/governanceModel.js

const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    voteCount: {
        type: Number,
        default: 0,
    },
    voters: {
        type: [String], // Array of addresses that have voted
        default: [],
    },
    executed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
