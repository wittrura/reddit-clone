describe('App', function() {
  beforeEach((done) => {
    browser.get(`/`)
    require('../app/db')('expenses').del().then(() => done())
  })

  it('can add expenses', function() {
    element(by.css('#new-category')).sendKeys('Flyers')
    element(by.css('#new-amount')).sendKeys('34.67')
    element(by.buttonText('Add Expense')).click()

    // check that the expense was added to the DOM
    expect(element.all(by.css('tbody > tr')).count()).toEqual(1)
    // check that the expense was persisted
    browser.get(`/`)
    expect(element.all(by.css('tbody > tr')).count()).toEqual(1)

    element(by.css('#new-category')).sendKeys('Signs')
    element(by.css('#new-amount')).sendKeys('4.45')
    element(by.buttonText('Add Expense')).click()
    expect(element.all(by.css('tbody > tr')).count()).toEqual(2)

    element(by.cssContainingText('tr', 'Flyers')).element(by.linkText('edit')).click()
    expect(element(by.css('#edit-category')).getAttribute('value')).toEqual("Flyers");
    expect(element(by.css('#edit-amount')).getAttribute('value')).toEqual("34.67");

    element(by.css('#edit-category')).sendKeys('!!')
    element(by.css('#edit-amount')).clear()
    element(by.css('#edit-amount')).sendKeys('55.55')
    element(by.buttonText('Update Expense')).click()

    expect(element(by.cssContainingText('tr', 'Flyers!!')).getText()).toMatch(/Flyers!!/)
    browser.get(`/`)
    expect(element(by.cssContainingText('tr', 'Flyers!!')).getText()).toMatch(/Flyers!!/)

    element(by.cssContainingText('tr', 'Flyers!!')).element(by.linkText('delete')).click()
    expect(element.all(by.cssContainingText('tr', 'Flyers!!')).count()).toEqual(0)
    browser.get(`/`)
    expect(element.all(by.cssContainingText('tr', 'Flyers!!')).count()).toEqual(0)
  })

})
