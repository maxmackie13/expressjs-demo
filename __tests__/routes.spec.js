const request = require('supertest');
const app = require('../server');

describe('api routes', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log(`Test API running on port 5000`)
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done)
    })
    
    test('GET / returns a message', (done) => {
        request(api)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    test('GET /hummus returns an array of hummus flavours', (done) => {
        request(api)
            .get('/hummus')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    test('GET /hummus/:id returns data about a specific hummus', (done) => {
        request(api)
            .get('/hummus/1')
            .set('Accept', 'application/json')
            .expect({ id: 1, flavour: 'classic organic', size: '100g' })
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    test('POST /hummus ', (done) => {
        request(api)
            .post('/hummus')
            .send({flavour: 'caremelized onion', size: '200g'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({ message: '200g caremelized onion hummus successfully added'})
            .expect(201, done)
    })

    test('GET /trash ', (done) => {
        request(api)
            .get('/trash')
            .expect(404, done)
    })
});
