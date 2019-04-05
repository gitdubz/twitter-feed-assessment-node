const app = require('../app');
const request = require('supertest');

describe('App > Settings', () => {
  test('it should set the correct app properties', () => {
    expect(app.get('trust proxy')).toEqual(true);
    expect(app.get('origin')).toEqual(process.env.ORIGIN || 'localhost');
    expect(app.get('port')).toEqual(process.env.PORT || 2001);
    expect(app.get('debug')).toEqual(process.env.NODE_ENV !== 'production');
  });

  test('it should return a json response for not found routes', async () => {
    const response = await request(app).get('/this-route-is-missing');
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual({
      status: 'error',
      message: { status: 404 }
    });
  });
});
