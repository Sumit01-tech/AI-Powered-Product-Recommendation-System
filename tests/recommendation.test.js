const request = require('supertest');
const app = require('../src/app');

describe('GET /api/recommendations/personalized', () => {
    it('requires auth', async () => {
        const res = await request(app).get('/api/recommendations/personalized');
        expect(res.statusCode).toBe(401); // Unauthorized
    });
});
