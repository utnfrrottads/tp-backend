describe('sign in', () => {
  it('should register a new user', () => {
    cy.visit('http://localhost:4200')
    cy.get('.ml-auto > :nth-child(1) > .nav-link').click()
    cy.get('input[name="nombreUsuario"]').type("CypressUser")
    cy.get('input[name="clave"]').type("cypressuser123")
    cy.get('input[name="nombreApellido"]').type("Cypress User")
    cy.get('input[name="email"]').type("cypress@user.com")
    cy.get('textarea[name="habilidades"]').type("Just being a robot")
    cy.get(':nth-child(11) > .btn').click()

    cy.get(':nth-child(2) > #navbarDropdown').click()
    cy.get('[href="/perfil"]').click()
    cy.get('.mb-3').should('have.text', 'Cypress User')
  })
})



// cy.get('.new-todo', {timeout: 6000}).type("Clean room{enter}")

// cy.get('.toggle').click()

// it('should be able to add a new todo to the list'), () => {

// })

// cy.get('label').should('have.text', 'Clean room')

// cy.get('.toggle').should('not.be.checked')

// cy.get('label').should('have.css', 'text-decoration-line', 'line-through')

// cy.get('.todo-list').should('not.have.descendants', 'li')

// cy.get(selector).should('not.have.descendants', 'li')

// describe('todo list actions')
// describe('filtering')

// visit is only needed on the first test that runs

// cy.get('.todo-list li').should('have.length', 3)
