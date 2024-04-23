describe('login page', () => {
  it('should show validation error when leving all feilds blank', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy="submit"]').click();
  });
  it('should redirect to the admin to the dasboard page after clicking submit', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.get('[data-cy="username"]').type('kavya');
    cy.wait(1000);
    cy.get('[data-cy="password"]').type('19980408@Ab');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/dashboard$/);
  });

  it('should redirect to the user to the home page after clicking submit if role is user', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.get('[data-cy="username"]').type('Nirvik');
    cy.wait(1000);
    cy.get('[data-cy="password"]').type('19980408@Ab');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/$/);
  });
  it('should redirect to the manager to the Manager Dashborad page after clicking submit if role is manager', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.get('[data-cy="username"]').type('Test');
    cy.wait(1000);
    cy.get('[data-cy="password"]').type('19980408@Ab');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/$/);
  });

  it('shouldnot redirect to the admin to the ManagerDashboard page after clicking submit', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.get('[data-cy="username"]').type('kavya');
    cy.wait(1000);
    cy.get('[data-cy="password"]').type('19980408@Ab');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/ManagerD$/);
  });
});
