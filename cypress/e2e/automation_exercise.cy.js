describe('Lista de Exercícios do Automation Exercise', () => {
  let user;

  beforeEach(() => {
    const { generateUserData } = require('../fixtures/userData.js');
    user = generateUserData();
    cy.visit('/');
  });

  it('Test Case 1: Register User', () => {
    cy.navigateToSignUpLogin();
    cy.fillSignUpFormAndSubmit(user);
    cy.deleteAccountAndAssertConfirmation();
  });
});
