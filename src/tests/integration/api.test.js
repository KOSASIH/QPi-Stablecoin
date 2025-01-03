// src/tests/integration/api.test.js

const request = require('supertest');
const { app } = require('../../app'); // Assuming your Express app is exported from app.js

describe('API Endpoints', function () {
    it('GET /api/tokens should return token information', async function () {
        const res = await request(app).get('/api/tokens');
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('tokens');
    });

    it('POST /api/transfer should initiate a token transfer', async function () {
        const res = await request(app)
            .post('/api/transfer')
            .send({ to: '0xRecipientAddress', amount: 100 });
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('transactionHash');
    });
});
