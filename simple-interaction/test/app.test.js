describe('App', function() {

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
