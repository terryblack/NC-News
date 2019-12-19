process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const chaiSorted = require('chai-sorted');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');
chai.use(chaiSorted);

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
      it('status:404 on requesting user that does not exist in db', () => {
        return request(app)
          .get('/api/users/not_a_user')
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('User does not exist');
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
      it('status:200 & returns requested article from DB', () => {
        return request(app)
          .get('/api/articles/2')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.be.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
            expect(article.comment_count).to.equal('0');
          });
      });
      it('status:200 & returns requested article from DB', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.be.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
            expect(article.comment_count).to.equal('13');
          });
      });
      it('status:404 when passed a article ID that is valid but does not exist in db', () => {
        return request(app)
          .get('/api/articles/99')
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Article not found');
          });
      });
    });
    describe('---method: PATCH', () => {
      it('status:200 & responds with the updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 99 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.article_id).to.equal(1);
            expect(article.votes).to.equal(199);
          });
      });
      it('status:200 & returns requested article from DB', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 99 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.be.have.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes');
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
      it('status:400 bad request when attempting to patch to incorrect endpoint', () => {
        return request(app)
          .patch('/api/articles/XXX')
          .send({ inc_votes: 99 })
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
      it('status:404 &when patching a non existent article', () => {
        return request(app)
          .patch('/api/articles/999')
          .send({ inc_votes: 99 })
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Article not found');
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
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys('comment_id', 'author', 'article_id', 'created_at', 'body', 'votes');
            expect(comment.body).to.be.equal('New comment to be added to article');
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
          .expect(422)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Unprocessable Entity');
          });
      });
      it('status:400 bad request when posting a comment without a username', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            body: 'New comment to be added to article'
          })
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
      it('status:422 when attempting to post to a valid, but non existent article_id', () => {
        return request(app)
          .post('/api/articles/99/comments')
          .send({
            username: 99,
            body: 'New comment to be added to article'
          })
          .expect(422)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Unprocessable Entity');
          });
      });
    });
    describe('---method: GET', () => {
      it('status:200 & should return an array of comments for the given article_id', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.have.a.lengthOf(13);
            expect(comments[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body');
          });
      });
      it('status:200 & should return comments in descending order of created_by as default', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy('created_at');
          });
      });
      it('status:200 & should accept a query and order results by query parameters', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes&&order=asc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy('votes');
          });
      });
      it('status:400 when passed an invalid sort by column', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=non_existent_column')
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
      it('status:404 when requesting comments from a non existent, but valid article_id', () => {
        return request(app)
          .get('/api/articles/999/comments')
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Article not found');
          });
      });
    });
  });
  describe('ENDPOINT /articles', () => {
    describe('---method: GET', () => {
      it('status:200 returns an array of article objects', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.an('Array');
          });
      });
      it('status:200 returns an array of article objects and each object should have a comment_count key', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach(article => {
              expect(article).to.contain.key('comment_count');
            });
          });
      });
      it('status:200 accepts sorty_by & order queries which are defaulted to date & descending', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.descendingBy('created_at');
          });
      });
      it('status:200 sorts objects by query filter & order', () => {
        return request(app)
          .get('/api/articles?sort_by=author&&order=asc')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).to.be.ascendingBy('author');
          });
      });
      it('status:200 filters by author passed into query', () => {
        return request(app)
          .get('/api/articles?author=icellusedkars')
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach(article => {
              expect(article.author).to.equal('icellusedkars');
            });
          });
      });
      it('status:200 filters by topic passed into query', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body: { articles } }) => {
            articles.forEach(article => {
              expect(article.topic).to.equal('mitch');
            });
          });
      });
      it('status:400 when passed an invalid sort by column', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=non_existent_column')
          .expect(400)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Bad request');
          });
      });
      it('status:404 when provided a non existent topic', () => {
        return request(app)
          .get('/api/articles?topic=XXXX')
          .expect(404)
          .then(({body :{message}}) => {
            expect(message).to.equal('Topic not found')
          });
      });
      it('status:404 when provided a non existent author', () => {
        return request(app)
          .get('/api/articles?author=XXXX')
          .expect(404)
          .then(({body :{message}}) => {
            expect(message).to.equal('Author not found')
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['put', 'delete', 'post'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/articles')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
    });
  });
  describe('ENDPOINT /comments/:comment_id', () => {
    describe('---method: PATCH', () => {
      it('status:200 & increments or decrements the vote count & responds with updated comment', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: -16 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment.comment_id).to.equal(1);
            expect(comment.votes).to.equal(0);
          });
      });
      it('status:200 send an unchanged comment when no `inc_votes` is provided in the request body', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({})
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment.comment_id).to.equal(1);
            expect(comment.votes).to.equal(16);
          });
      });
      it('status:404: Not Found when `PATCH` contains a valid comment_id that does not exist', () => {
        return request(app)
          .patch('/api/comments/999')
          .send({ inc_votes: 9999 })
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Comment not found');
          });
      });
    });
    describe('---method: DELETE', () => {
      it('status:204 & removes the comment from the dB based on comment_id', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204);
      });
      it('status:404 & responds with the comment does not exist', () => {
        return request(app)
          .delete('/api/comments/9999999')
          .expect(404)
          .then(({ body: { message } }) => {
            expect(message).to.equal('Comment does not exist');
          });
      });
      it('status:405, invalid method used on endpoint', () => {
        const methods = ['put', 'post'];
        const promises = methods.map(function(method) {
          return request(app)
            [method]('/api/comments/1')
            .expect(405)
            .then(({ body: { message } }) => {
              expect(message).to.equal('Method not allowed on this path');
            });
        });
        return Promise.all(promises);
      });
    });
  });
});
