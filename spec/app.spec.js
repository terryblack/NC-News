process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const connection = require('../db/connection');

after(() => {
  connection.destroy();
});
