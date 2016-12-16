const createApp = require('./support').createApp
const path = require('path')

describe('App', function() {
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

  it('can manage houses', function() {
    expect(element.all(by.repeater('house in $ctrl.houses')).count()).toEqual(1)

    element(by.linkText('Add House')).click()
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/houses/new");

    element(by.model('$ctrl.house.name')).sendKeys('Room with a view')
    element(by.model('$ctrl.house.address')).sendKeys('10-25 Main St')
    element(by.buttonText('Create House')).click()
    expect(browser.getCurrentUrl()).toMatch("/houses/\\d");

    element(by.linkText('Return Home')).click()
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/");

    element(by.linkText('Room with a view')).click()
    expect(browser.getCurrentUrl()).toMatch("/houses/\\d");
  })

})
