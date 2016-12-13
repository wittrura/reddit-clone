exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  mochaOpts:{
    reporter: 'spec',
    slow: 3000,
    enableTimeouts: false
  },
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true,
  specs: ['*.test.js'],
  onPrepare: function() {
    // By default, Protractor use data:text/html,<html></html> as resetUrl, but
    // location.replace from the data: to the file: protocol is not allowed
    // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
    // with the file: protocol (this particular one will open system's root folder)
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(500);
    browser.resetUrl = 'file:///';
  }
};
