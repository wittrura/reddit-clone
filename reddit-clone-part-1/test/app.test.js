describe('App', function() {
  beforeEach(() => {
    browser.get(`/`)
  })

  it('toggles the form', function() {
    new PostForm()
      .expectFormToBeClosed()
      .clickNewPostButton()
      .expectFormToBeOpen()
      .clickNewPostButton()
      .expectFormToBeClosed()
  })

  it('disables the button until the form is valid', function() {
    new PostForm()
      .clickNewPostButton()
      .expectButtonToBeDisabled()
      .fillIn()
      .expectButtonToBeEnabled()
  })

  it('changes the validation class names on blur', function() {
    new PostForm()
      .clickNewPostButton()
      .expectClassesToChangeOnBlur()
  })

  it('creates a post', function() {
    new PostForm()
      .clickNewPostButton()
      .fillIn()
      .clickCreatePostButton()
      .expectPostToBeAdded()
  })

  class PostForm {
    constructor (title = 'My Post Title', body = 'My Post Body', author = 'Some Author', imageUrl = 'http://example.com/foo') {
      this.title = title
      this.body = body
      this.author = author
      this.imageUrl = imageUrl
      this.titleField = element(by.cssContainingText('form div,form p', 'Title')).element(by.css('input'))
      this.bodyField = element(by.cssContainingText('form div,form p', 'Body')).element(by.css('textarea'))
      this.authorField = element(by.cssContainingText('form div,form p', 'Author')).element(by.css('input'))
      this.imageUrlField = element(by.cssContainingText('form div,form p', 'Image URL')).element(by.css('input'))
      this.newPostButton = element(by.cssContainingText('a,button', 'New Post'))
      this.createPostButton = element(by.cssContainingText('input,button', 'Create Post'))

      this.postElement = element(by.cssContainingText('div[ng-repeat]', this.title))
    }

    clickNewPostButton() {
      this.newPostButton.click()
      return this
    }

    clickCreatePostButton() {
      this.createPostButton.click()
      return this
    }

    fillIn() {
      this.titleField.sendKeys(this.title)
      this.bodyField.sendKeys(this.body)
      this.authorField.sendKeys(this.author)
      this.imageUrlField.sendKeys(this.imageUrl)
      return this
    }

    expectFormToBeClosed() {
      expect(element.all(by.css('form')).count()).toEqual(0)
      return this
    }

    expectFormToBeOpen() {
      expect(element.all(by.css('form')).count()).toEqual(1)
      return this
    }

    expectButtonToBeEnabled() {
      expect(this.createPostButton.getAttribute('disabled')).toEqual(null)
      return this
    }

    expectButtonToBeDisabled() {
      expect(this.createPostButton.getAttribute('disabled')).toEqual('true')
      return this
    }

    expectClassesToChangeOnBlur() {
      [this.titleField, this.bodyField, this.authorField, this.imageUrlField].forEach(el => {
          const cssClass = el.getAttribute('class')
          browser.executeScript('arguments[0].focus(); arguments[0].blur()', el)
          expect(el.getAttribute('class')).not.toEqual(cssClass)
      })
      return this
    }

    expectPostToBeAdded() {
      expect(this.postElement.element(by.css('img')).getAttribute('src')).toEqual(this.imageUrl)
      expect(this.postElement.getText()).toMatch(this.title)
      expect(this.postElement.getText()).toMatch(this.body)
      expect(this.postElement.getText()).toMatch(this.author)
    }
  }

})
