const app = require('../server');
const request = require('supertest');

describe('Test the root path', () => {
    test('It should be response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
    test('Response body should be in JSON format', async () => {
        const response = await request(app).get('/');
        expect(response.headers['content-type']).toBe('application/json');

    });
    //TODO-me find way to stop process after all tests, server still stands after tests done and i have to stop
    // it by press CTRL+C
    afterAll(async () => {
      await app.close()
    });
});


