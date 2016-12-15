const createApp = require('./support').createApp
const path = require('path')

describe('Simple interaction', function() {
  const h1 = element(by.css('h1'))

  let server

  beforeAll(function (done) {
    const app = createApp()

    server = app.listen(0, function () {
      browser.baseUrl = `http://localhost:${server.address().port}`
      done()
    })
  })

  afterAll(() => server.close())

  beforeEach(() => browser.get(`/`))

  it('formats the nickname correctly', function() {
    element(by.model('$ctrl.firstName')).sendKeys('Dwayne')
    element(by.model('$ctrl.nickname')).sendKeys('the Rock')
    element(by.model('$ctrl.lastName')).sendKeys('Johnson')
    element(by.buttonText('Submit')).click()

    expect(element(by.css('p:last-child')).getText()).toEqual('Dwayne "the Rock" Johnson')
  })

  it('formats the name correctly without a nickname', function() {
    element(by.model('$ctrl.firstName')).sendKeys('Dwayne')
    element(by.model('$ctrl.lastName')).sendKeys('Johnson')
    element(by.buttonText('Submit')).click()

    expect(element(by.css('p:last-child')).getText()).toEqual('Dwayne Johnson')
  })

})
