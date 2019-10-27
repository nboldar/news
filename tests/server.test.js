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
    afterAll(() => {
       app.close()
    });
});


