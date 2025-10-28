describe('Lista de Exercícios do Automation Exercise', () => {
  let randomUser = null;
  const createdUser = require('../fixtures/createdUser.json');

  beforeEach(() => {
    const { generateUserData } = require('../fixtures/userData.js');
    randomUser = generateUserData();
    cy.visit('/');
  });

  it('Test Case 1: Register User', () => {
    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillNewUserSignUpFormAndSubmit(randomUser);
    cy.fillEnterAccountInformationFormAndSubmit(randomUser)
    cy.assertLoggedInAs(randomUser.firstName, randomUser.lastName);
    cy.deleteAccountAndAssertConfirmation();
  });

  it('Test Case 2: Login User', () => {
    cy.createUserWithSetCredentialsAndRandomInformationAPI(randomUser);

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
    cy.createUserWithSetCredentialsAndRandomInformationAPI(randomUser);

    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillLoginFormWithCreatedUserAndSubmit();
    cy.assertLoggedInAsCreatedUser();
    cy.logoutUserAndAssertLoginPage();

    cy.deleteUserAPIForTeardownNeededScenarios();
  });

  it('Test Case 5: Register User with existing email', () => {
    cy.createUserWithSetCredentialsAndRandomInformationAPI(randomUser);

    cy.assertHomePageVisibility();
    cy.navigateToSignUpLogin();
    cy.fillNewUserSignUpFormAndSubmit(createdUser);

    cy.contains('p', 'Email Address already exist!').should('be.visible');
  });

  it.only('Test Case 6: Contact Us Form', () => {
    cy.assertHomePageVisibility();
    cy.accessContactPageSubmitAndAssertThenGoBackToHomePage();
    cy.assertHomePageVisibility();
  });
});
