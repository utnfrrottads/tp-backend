describe('', () => {
  it('homepage can be opened', () => {
    cy.visit('http://localhost:4200')
    cy.contains('¡Servicios particulares on-demand!')
  })
});
