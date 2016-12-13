const expect = require('chai').expect

describe('mad libs', function() {
  it('should work for mad libs', function() {
    browser.get(`file://${__dirname}/index.html`);

    element(by.css('h1')).getText().then((text) => {
      expect(text).to.equal('Some text')
    })

    browser.getTitle().then(function (title) {
      expect(title).to.eq('what')
    })

    element(by.model('text')).sendKeys('here is a thing')
    element(by.css('.foo')).getText().then(function (text) {
      expect(text).to.eq('here is a thing')
    })
  });
});
