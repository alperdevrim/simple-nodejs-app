const express = require('express');
const request = require('supertest');
const app = express();

// Import the routes
require('./index');

describe('API Endpoints', () => {
  test('GET /health should return status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /hello should return greeting message', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello from Jenkins Practice App!');
  });
}); 