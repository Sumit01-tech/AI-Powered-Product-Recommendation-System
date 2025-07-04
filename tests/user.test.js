require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); // ✅ Only import app
const User = require('../src/models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Auth Routes', () => {
    it('should signup a new user', async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({ email: 'test@example.com', password: 'pass123' });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'pass123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should reject invalid login', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ email: 'test@example.com', password: 'wrongpass' });

        expect(res.statusCode).toBe(401);
    });
});
