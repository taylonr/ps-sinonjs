import getPrices from './currency.js';

const expect = chai.expect;

describe('Currency Tests', () => {
  let xhr, requests;
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    requests = [];

    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    xhr.restore && xhr.restore();
  });
  it('Should return the same price when converting to USD', (done) => {


    const cb = (price) => {
      try{
        expect(price).to.equal('10.00');
        done();
      } catch(e) {
        done(e);
      }
    };
    getPrices(10, 'USD', cb);

    const request = requests[0];
    request.respond(200, {'Content-Type': 'application/json'},
      '{ "rates": {"USD": 1} }');

  });
});