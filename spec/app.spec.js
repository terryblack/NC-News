process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('----API ENDPOINTS----', () => {
  describe('Errors', () => {
    it('status:404, PATH NOT FOUND', () => {
      return request(app)
        .get('/invalid_path!!!')
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).to.equal('Path not found');
        });
    });
  });
  describe('/topics', () => {
    describe('method: GET', () => {
      it('status:200 & returns all topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.be.an('Array');
          });
      });
    });
  });
});
