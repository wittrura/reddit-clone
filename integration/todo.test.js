const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

describe('mad libs', function() {
  const h1 = element(by.css('h1'))

  it('should work for mad libs', function() {
    browser.get(`file://${__dirname}/index.html`);

    expect(h1.getText()).to.eventually.eq('Some text');

    browser.getTitle().then(function (title) {
      expect(title).to.eq('what')
    })

    element(by.model('text')).sendKeys('here is a thing')
    element(by.css('.foo')).getText().then(function (text) {
      expect(text).to.eq('here is a thing')
    })
  });
});
