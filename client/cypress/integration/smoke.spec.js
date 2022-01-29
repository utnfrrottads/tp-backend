describe('', () => {
  it('homepage can be opened', () => {
    cy.visit('http://localhost:4200')
    cy.contains('¡Servicios particulares on-demand!')
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
