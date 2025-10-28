describe('Lista de Exercícios do Automation Exercise', () => {
  let randomUser = null;

  beforeEach(() => {
    const { generateUserData } = require('../fixtures/userData.js');
    randomUser = generateUserData();
    cy.visit('/');
  });

  it('Test Case 1: Register User', () => {
    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillSignUpFormAndSubmit(randomUser);
    cy.assertLoggedInAs(randomUser.firstName, randomUser.lastName);
    cy.deleteAccountAndAssertConfirmation();
  });

  it('Test Case 2: Login User', () => {
    cy.createUserAPIForSetupNeededScenarios(randomUser);

    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillLoginFormWithCreatedUserAndSubmit();
    cy.assertLoggedInAsCreatedUser();
    cy.deleteAccountAndAssertConfirmation();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillLoginFormWithCreatedUserAndSubmit();
    cy.assertLoginErrorMessage();
  });

  it('Test Case 4: Logout User', () => {
    cy.createUserAPIForSetupNeededScenarios(randomUser);

    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillLoginFormWithCreatedUserAndSubmit();
    cy.assertLoggedInAsCreatedUser();
    cy.logoutUserAndAssertLoginPage();

    cy.deleteUserAPIForTeardownNeededScenarios();
  });
});
