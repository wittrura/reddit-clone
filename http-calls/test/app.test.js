describe('App', function() {
  beforeEach((done) => {
    browser.get(`/`)
    require('../app/db')('expenses').del().then(() => done())
  })

  it('can add expenses', function() {
    new Expenses()
      .addExpense()
      .expectExpenseIsAddedAndPersisted()
      .addAnotherExpense()
      .updateExpense()
      .expectExpenseIsUpdatedAndPersisted()
      .deleteExpense()
      .expectExpenseIsDeletedAndPersisted()
  })

  class Expenses {

    constructor() {
      this.newCategoryField = element(by.css('#new-category'))
      this.newAmountField = element(by.css('#new-amount'))
      this.addExpenseButton = element(by.buttonText('Add Expense'))
      this.rows = element.all(by.css('tbody > tr'))
      this.editCategoryField = element(by.css('#edit-category'))
      this.editAmountField = element(by.css('#edit-amount'))
      this.expenseRow = element(by.cssContainingText('tr', 'Flyers!!'))
    }

    addExpense() {
      this.newCategoryField.sendKeys('Flyers')
      this.newAmountField.sendKeys('34.67')
      this.addExpenseButton.click()
      return this
    }

    addAnotherExpense() {
      this.newCategoryField.sendKeys('Signs')
      this.newAmountField.sendKeys('4.45')
      this.addExpenseButton.click()
      expect(this.rows.count()).toEqual(2)
      return this
    }

    updateExpense() {
      element(by.cssContainingText('tr', 'Flyers')).element(by.linkText('edit')).click()
      expect(this.editCategoryField.getAttribute('value')).toEqual("Flyers");
      expect(this.editAmountField.getAttribute('value')).toEqual("34.67");

      this.editCategoryField.sendKeys('!!')
      this.editAmountField.clear()
      this.editAmountField.sendKeys('55.55')
      element(by.buttonText('Update Expense')).click()
      return this
    }

    deleteExpense() {
      this.expenseRow.element(by.linkText('delete')).click()
      return this
    }

    expectExpenseIsAddedAndPersisted() {
      expect(this.rows.count()).toEqual(1)
      browser.get(`/`)
      expect(this.rows.count()).toEqual(1)
      return this
    }

    expectExpenseIsUpdatedAndPersisted() {
      expect(this.expenseRow.getText()).toMatch(/Flyers!!/)
      browser.get(`/`)
      expect(this.expenseRow.getText()).toMatch(/Flyers!!/)
      return this
    }

    expectExpenseIsDeletedAndPersisted() {
      expect(element.all(by.cssContainingText('tr', 'Flyers!!')).count()).toEqual(0)
      browser.get(`/`)
      expect(element.all(by.cssContainingText('tr', 'Flyers!!')).count()).toEqual(0)
      return this
    }

  }

})
