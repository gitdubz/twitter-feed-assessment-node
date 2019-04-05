const request = require('supertest');
const app = require('../../app');

describe('Routes > Feed', () => {
  describe('- GET(/) :: twitter feed', () => {
    test('it should return a successful response', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('text/html');
      expect(response.text).toBeTruthy();
    });
  });
});
