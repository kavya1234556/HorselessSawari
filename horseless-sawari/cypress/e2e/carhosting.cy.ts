describe('carHosting page', () => {
  it('should show validation error when leaving all feilds blank', () => {
    cy.visit('http://localhost:3000/car-hosting');
    cy.get('[data-cy="submit"]').click();
  });
});
