const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const controller = require('./user.controller');
const model = require('../models').user;
