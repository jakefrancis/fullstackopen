describe('Blog app', function() {
  const user = {
    name: 'donnie francis',
    username: 'donnie',
    password: 'radical'
  }
  const user2 = {
    name: 'jake francis',
    username: 'jfrancis',
    password: 'spicy'

  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('donnie')
      cy.get('#password')
        .type('radical')
      cy.contains('login')
        .click()
      cy.contains('donnie francis logged-in')
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('donnie')
      cy.get('#password')
        .type('wrong')
      cy.contains('login')
        .click()
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')      // ...
    })
  })

  describe('When logged in', function(){
    const blog ={
      author: 'Donnie Franics',
      title: 'how to be rad',
      url: 'www.howtoberad.com'
    }
    beforeEach(function(){
      cy.login(user.username,user.password)
    })

    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.contains('save').click()
      cy.get('.blog').contains(`${blog.title} - ${blog.author}`)
    })



    describe('when a blog already exists', function(){

      beforeEach(function(){
        cy.createBlog({ title: blog.title, author: blog.author,url: blog.url })
      })

      it('A blog can be deleted by the user who created it', function(){
        cy.get('.blog').contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.get('.blog').should('not.exist')
      })

      it('It can not be deleted by a user who did not create it', function(){
        cy.contains('logout').click()
        cy.login(user2.username,user2.password)
        cy.get('.blog').contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('A blog can be liked by multiple users', function(){
        cy.get('.blog').contains('view').click()
        cy.get('.blog').contains('likes:0')
        cy.get('.blog').contains('like').click()
        cy.get('.blog').contains('likes:1')
        cy.contains('logout').click()
        cy.login(user2.username,user2.password)
        cy.get('.blog').contains('view').click()
        cy.get('.blog').contains('like').click()
        cy.get('.blog').contains('likes:2')
        cy.get('.blog').contains('like').click()
        cy.get('.blog').contains('likes:1')
      })

      it.only('blogs are sorted by most liked', function(){

        cy.contains('logout').click()
        cy.login(user2.username,user2.password)
        cy.createBlog({ title: 'test', author: 'tester', url: 'www.test.com' })
        cy.contains('test - tester').parent().contains('view').click()
        cy.contains('test - tester').parent().find('button').contains('like').click()
        cy.contains(`${blog.title} - ${blog.author}`).parent().contains('view').click().wait(1000)
        cy.get('.likes')
          .should('have.length', 2)
          .then(($els) => {
            return(
              Cypress.$.makeArray($els).map((el) => el.innerText)
            )
          })
          .should('deep.equal', ['likes:1','likes:0'])

      })


    })



  })


})