describe('App', function() {
  beforeEach(() => browser.get(`/`))

  it('loads with 2 items pre-populated', function() {
    new ListManagement()
      .expectElements(2)
  })

  it('allows a user to add to the list', function() {
    new ListManagement()
      .addItem()
      .expectItemToBeAdded()
      .expectFormToBeCleared()
  })

  it('allows a user to delete from the list', function() {
    new ListManagement()
      .deleteItem()
      .expectItemDeleted()
  })

  class ListManagement {

    constructor() {
      this.items = element.all(by.repeater('item in $ctrl.items'))
      this.nameField = element(by.css('#name'))
      this.quantityField = element(by.css('#quantity'))
    }

    addItem() {
      this.nameField.sendKeys('Gnome')
      this.quantityField.sendKeys('34')
      element(by.buttonText('Add Item')).click()
      return this
    }

    deleteItem() {
      element(by.cssContainingText('div', 'Couch 2')).element(by.linkText('Delete')).click()
      return this
    }

    expectElements(num) {
      expect(this.items.count()).toEqual(num)
      return this
    }

    expectItemToBeAdded() {
      expect(this.items.get(2).getText()).toMatch(/Gnome 34/)
      return this
    }

    expectFormToBeCleared() {
      expect(this.nameField.getAttribute('value')).toEqual("")
      expect(this.quantityField.getAttribute('value')).toEqual("")
      return this
    }

    expectItemDeleted() {
      expect(this.items.count()).toEqual(1)
      return this
    }

  }

})
