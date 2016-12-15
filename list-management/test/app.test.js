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

  it('loads with 2 items pre-populated', function() {
    expect(element.all(by.repeater('item in $ctrl.items')).count()).toEqual(2)
  })

  it('allows a user to add to the list', function() {
    element(by.css('#name')).sendKeys('Gnome')
    element(by.css('#quantity')).sendKeys('34')
    element(by.buttonText('Add Item')).click()

    expect(element.all(by.repeater('item in $ctrl.items')).get(2).getText()).toMatch(/Gnome 34/)

    expect(element(by.css('#name')).getAttribute('value')).toEqual("")
    expect(element(by.css('#quantity')).getAttribute('value')).toEqual("")
  })

  it('allows a user to delete from the list', function() {
    element(by.cssContainingText('div', 'Couch 2')).element(by.linkText('Delete')).click()

    expect(element.all(by.repeater('item in $ctrl.items')).count()).toEqual(1)
  })

})
