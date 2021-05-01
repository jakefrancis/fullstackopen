describe('Note app', function() {

  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user =  {
      username: 'root',
      name: 'super user',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-top-style', 'solid')
      .and('have.css', 'border-bottom-style', 'solid')
      .and('have.css', 'border-left-style', 'solid')
      .and('have.css', 'border-right-style', 'solid')

    cy.get('html').should('not.contain', 'super user logged-in')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Take some notes ✏️')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('super user logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'secret' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('it can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })

  })

})