describe('App', function() {
  beforeEach(() => browser.get(`/`))

  it('works', function() {
    new Homes()
      .checkQuotes()
      .checkHomes()
  })

  class Homes {

    constructor() {
      this.linkToHomes = element(by.cssContainingText('a', "Click here to see listings"))
      this.quoteBlock = element(by.css(".quoteBlock"))
      this.refreshQuoteButton = element(by.css(".fa.fa-refresh"))
      this.repeater = element.all(by.css("[ng-repeat]"))
      this.backToMainPage = element(by.cssContainingText('a', "Back to main page"))
    }

    checkQuotes() {
      const original = this.quoteBlock.getText()
      this.refreshQuoteButton.click()
      expect(this.quoteBlock.getText()).not.toEqual(original)
      return this
    }

    checkHomes() {
      this.linkToHomes.click()
      expect(this.repeater.count()).toEqual(3)
      this.backToMainPage.click()
      expect(element(by.css("body")).getText()).toContain("Welcome to Angular Homes")
      return this
    }

  }

})
