const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const controller = require('./user.controller');
const model = require('../models').user;
const wishlist = require('../models').wishlist;

describe('When creating a user', () => {
  let timer = {};

  afterEach(() => {
    wishlist.create.restore && wishlist.create.restore();
    model.create.restore && model.create.restore();
    timer.restore && timer.restore();
  });

  it('Should have a customerSince field', () => {
    const req = httpMocks.createRequest({
      body: {
        firstName: 'test',
        lastName: 'tester',
        email: 'test@test.com'
      }
    });

    const res = httpMocks.createResponse();

    const newList = sinon.stub(wishlist, 'create');

    newList.resolves({dataValues: {id: 1}});

    const userCreate = sinon.spy(model, 'create');

    return controller.create(req, res).then(() => {
      expect(userCreate.calledWith(sinon.match({
        customerSince: sinon.match.date
      }))).to.eql(true);
    });
  });

  it('Should set the customer since field to new Date', () => {
    timer = sinon.useFakeTimers();

    const req = httpMocks.createRequest({
      body: {
        firstName: 'test',
        lastName: 'tester',
        email: 'test@test.com'
      }
    });

    const res = httpMocks.createResponse();

    const newList = sinon.stub(wishlist, 'create');

    newList.resolves({dataValues: {id: 1}});

    const userCreate = sinon.spy(model, 'create');

    return controller.create(req, res).then(() => {
      expect(userCreate.args[0][0].customerSince).to.eql(new Date());
    });
  });
});