describe('App', function() {

  beforeEach(() => browser.get(`/`))

  it('can manage houses', function() {
    new HouseTest()
      .clickOnAddHouseLink()
      .fillInAndSubmitForm()
      .expectToBeOnTheShowPage()
      .goToHomePage()
      .expectNewHouseToBeThere()
      .clickOnHouseLink()
      .expectToBeOnTheShowPage()
  })

  class HouseTest {

    constructor() {
      this.houses = element.all(by.repeater('house in $ctrl.houses'))
      this.addHouseLink = element(by.linkText('Add House'))
      this.nameField = element(by.model('$ctrl.house.name'))
      this.addressField = element(by.model('$ctrl.house.address'))
      this.createHouseButton = element(by.buttonText('Create House'))
      this.returnHomeLink = element(by.linkText('Return Home'))
    }

    clickOnAddHouseLink() {
      expect(this.houses.count()).toEqual(1)
      this.addHouseLink.click()
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/houses/new")
      return this
    }

    fillInAndSubmitForm() {
      this.nameField.sendKeys('Room with a view')
      this.addressField.sendKeys('10-25 Main St')
      this.createHouseButton.click()
      return this
    }

    goToHomePage() {
      this.returnHomeLink.click()
      return this
    }

    expectNewHouseToBeThere() {
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/");
      expect(this.houses.count()).toEqual(2)
      return this
    }

    clickOnHouseLink() {
      element(by.linkText('Room with a view')).click()
      return this
    }

    expectToBeOnTheShowPage() {
      expect(browser.getCurrentUrl()).toMatch("/houses/\\d");
      return this
    }

  }

})
