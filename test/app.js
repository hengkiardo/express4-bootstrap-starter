var request = require('supertest');
var app = require('../server.js');

describe('GET /', function() {
    it('should return 200 OK', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('GET /login', function() {
    it('should return 200 OK', function(done) {
        request(app)
            .get('/login')
            .expect(200, done);
    });
});

describe('GET /signup', function() {
    it('should return 200 OK', function(done) {
        request(app)
            .get('/signup')
            .expect(200, done);
    });
});
