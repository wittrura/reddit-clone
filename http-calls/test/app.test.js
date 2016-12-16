describe('App', function() {
  beforeEach((done) => {
    browser.get(`/`)
    require('../app/db')('expenses').del().then(() => done())
  })

  it('can add expenses', function() {
    element(by.model('$ctrl.expense.category')).sendKeys('Flyers')
    element(by.model('$ctrl.expense.amount')).sendKeys('34.67')
    element(by.buttonText('Add Expense')).click()

    // check that the expense was added to the DOM
    expect(element.all(by.repeater('expense in $ctrl.expenses')).count()).toEqual(1)
    // check that the expense was persisted
    browser.get(`/`)
    expect(element.all(by.repeater('expense in $ctrl.expenses')).count()).toEqual(1)

    element(by.model('$ctrl.expense.category')).sendKeys('Signs')
    element(by.model('$ctrl.expense.amount')).sendKeys('4.45')
    element(by.buttonText('Add Expense')).click()
    expect(element.all(by.repeater('expense in $ctrl.expenses')).count()).toEqual(2)

    element(by.cssContainingText('tr', 'Flyers')).element(by.linkText('edit')).click()
    expect(element(by.model('$ctrl.editingExpense.category')).getAttribute('value')).toEqual("Flyers");
    expect(element(by.model('$ctrl.editingExpense.amount')).getAttribute('value')).toEqual("34.67");

    element(by.model('$ctrl.editingExpense.category')).sendKeys('!!')
    element(by.model('$ctrl.editingExpense.amount')).clear()
    element(by.model('$ctrl.editingExpense.amount')).sendKeys('55.55')
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
