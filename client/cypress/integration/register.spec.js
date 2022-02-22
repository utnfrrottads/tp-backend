describe('sign in, log in, log out and account deletion', () => {
  // test data
  const username = 'CypressUser';
  const name = 'Cypress User';
  const password = 'cypressuser123';
  const email = 'user@cypress.com';
  const skills = 'just being a robot';

  it('should register a new user', () => {
    // cy.visit('http://localhost:4200');
    cy.visit('/');
    cy.get(':nth-child(1) > .btn').click();
    cy.get('input[name="nombreUsuario"]').type(username);
    cy.get('input[name="clave"]').type(password);
    cy.get('input[name="nombreApellido"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('textarea[name="habilidades"]').type(skills);
    cy.get('.btn-success').click();

    cy.get(':nth-child(2) > #navbarDropdown').click();
    cy.get('[href="/perfil"]').click();
    cy.get('.mb-3').should('have.text', name);
  });

  it('should log out', () => {
    cy.get(':nth-child(2) > #navbarDropdown').click();
    cy.get('.cerrar-sesion').click();
    cy.contains('Registrarse');
  });

  it('should log in and delete the user', () => {
    cy.get('.ml-auto > :nth-child(2) > .btn').click();
    cy.get('input[name="nombreUsuario"]').type(username);
    cy.get('input[name="clave"]').type(password);
    cy.contains('Iniciar Sesión').click();

    cy.get(':nth-child(2) > #navbarDropdown').click();
    cy.get('[href="/perfil"]').click();
    cy.get('.mb-3').should('have.text', name);
    cy.get('#deleteAccountButton').click();
    cy.get('#confirmDeleteAccountButton').click();
  });

  it('should fail when trying to log in with the deleted user', () => {
    // cy.visit('http://localhost:4200');
    cy.visit('/');
    cy.get('.ml-auto > :nth-child(2) > .btn').click();
    cy.get('input[name="nombreUsuario"]').type(username);
    cy.get('input[name="clave"]').type(password);
    cy.get('.btn-success').click();
    cy.contains('Nombre de usuario y/o clave incorrectos');
  });
});
