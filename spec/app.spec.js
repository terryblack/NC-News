process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('API ENDPOINTS --> /api', () => {
  describe('404 Path Error', () => {
    it('status:404, PATH NOT FOUND', () => {
      return request(app)
        .get('/invalid_path!!!')
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).to.equal('Path not found');
        });
    });
  });
  describe('ENDPOINT /topics', () => {
    describe('---method: GET', () => {
      it('status:200 & returns all topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body: { topics } }) => {
            expect(topics).to.be.an('Array');
            expect(topics[0]).to.have.keys('slug', 'description');
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['patch', 'put', 'delete'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/users/topics')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('ENDPOINT /users/:username', () => {
    describe('---method: GET', () => {
      it('status:200 & returns requested username from DB', () => {
        return request(app)
          .get('/api/users/icellusedkars')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.have.keys('username', 'avatar_url', 'name');
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['patch', 'put', 'delete'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/users/testusername')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('ENDPOINT /articles/:article_id', () => {
    describe('---method: GET', () => {
      it('status:200 & returns requested article from DB', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.be.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
            expect(article.comment_count).to.equal('13');
          });
      });
    });
    describe('---method: PATCH', () => {
      it('status:201 & responds with the updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 99 })
          .expect(201)
          .then(({ body: { updatedArticle } }) => {
            expect(updatedArticle.article_id).to.equal(1);
            expect(updatedArticle.votes).to.equal(199);
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['put', 'delete'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/users/1')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
      it('status:400 bad request when patching a value of incorrect type', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 'nine' })
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
      it('status:400 bad request when attmepting to patch to incorrect endpoint', () => {
        return request(app)
          .patch('/api/articles/XXX')
          .send({ inc_votes: 99 })
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
    });
  });
  describe('ENDPOINT /articles/:article_id/comments', () => {
    describe('---method: POST', () => {
      it('status:201, posts new comment to DB & responds with added comment ', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 'icellusedkars',
            body: 'New comment to be added to article'
          })
          .expect(201)
          .then(({ body: { postedComment } }) => {
            expect(postedComment).to.have.keys('comment_id', 'author', 'article_id', 'created_at', 'body', 'votes');
            expect(postedComment.body).to.be.equal('New comment to be added to article');
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['put', 'delete', 'post'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/users/1')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
      it('status:400 bad request when posting a value of incorrect type', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 99,
            body: 'New comment to be added to article'
          })
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
    });
    describe('---method: GET', () => {
      it('status:200 & should return an array of comments for the given article_id', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body: {comments}}) => {
          expect(comments).to.have.a.lengthOf(13)
        })
      });
    });
  });
});
