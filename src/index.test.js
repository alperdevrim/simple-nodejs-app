const request = require('supertest');
const app = require('./test-server');

describe('API Endpoints', () => {
  test('GET /health should return status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /api/todos should return empty array initially', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  test('POST /api/todos should create a new todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'Test Description',
      dueDate: new Date().toISOString()
    };
    
    const response = await request(app)
      .post('/api/todos')
      .send(todoData);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(todoData.title);
    expect(response.body.description).toBe(todoData.description);
    expect(response.body.completed).toBe(false);
  });

  test('GET /api/todos should return todos after creation', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
}); 