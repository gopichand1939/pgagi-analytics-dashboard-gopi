 
describe('Weather Page', () => {
  it('loads weather data', () => {
    cy.visit('/weather');
    cy.get('h1').should('contain', 'Weather Dashboard');
    cy.get('input[placeholder="Search weather for a city"]').type('Chennai');
    cy.get('.bg-white').should('contain', 'Chennai');
  });
});
