module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('User Registration API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Registration successful');
  });

  it('should reject duplicate email registration', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        name: 'Duplicate User',
        email: 'test@example.com', // Duplicate email
        password: 'testpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is already registered');
  });
});
