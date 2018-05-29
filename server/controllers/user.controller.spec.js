const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const controller = require('./user.controller');
const model = require('../models').user;
const wishlist = require('../models').wishlist;

describe('When creating a user', () => {
  it('Should add a customerSince field', () => {
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
        customerSince: sinon.match.date}))).to.eql(true);
    });
  });
});
  });
});