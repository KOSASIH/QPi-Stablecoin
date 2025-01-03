// src/tests/integration/endToEnd.test.js

const request = require('supertest');
const { app } = require('../../app');

describe('End-to-End Tests', function () {
    it('Should complete a full transaction flow', async function () {
        // Step 1: Create a new token
        const createTokenRes = await request(app).post('/api/tokens').send({ name: 'TestToken', symbol: 'TT' });
        expect(createTokenRes.statusCode).to.equal(201);

        // Step 2: Transfer tokens
        const transferRes = await request(app)
            .post('/api/transfer')
            .send({ to: '0xRecipientAddress', amount: 50 });
        expect(transferRes.statusCode).to.equal(200);

        // Step 3: Check balances
        const balanceRes = await request(app).get('/api/balance/0xRecipientAddress');
        expect(balanceRes.statusCode).to.equal(200);
        expect(balanceRes.body.balance).to.equal(50);
    });
});
