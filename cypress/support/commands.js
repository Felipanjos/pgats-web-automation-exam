const createdUser = require('../fixtures/createdUser.json');

Cypress.Commands.addAll({
  assertHomePageVisibility() {
    cy.contains('h2', 'Full-Fledged practice website for Automation Engineers').should('be.visible');
    cy.get('#slider-carousel').should('be.visible');
  },

  navigateToSignUpLogin() {
    cy.contains('a', 'Signup / Login').click();
    cy.contains('h2', 'New User Signup!').should('be.visible');
    cy.contains('h2', 'Login to your account').should('be.visible');
  },

  fillNewUserSignUpFormAndSubmit(userData) {
    cy.get('input[data-qa="signup-name"]').type(userData.username);
    cy.get('input[data-qa="signup-email"]').type(userData.email);
    cy.get('button[data-qa="signup-button"]').click();
  },

  fillEnterAccountInformationFormAndSubmit(userData) {
    cy.contains('h2', 'Enter Account Information').should('be.visible');

    if (userData.gender === 'male') cy.get('input[id="id_gender1"]').check();
    else cy.get('input[id="id_gender2"]').check();

    cy.get('input[id="password"]').type(userData.password);
    cy.get('select[data-qa="days"]').select(userData.birthDate.day);
    cy.get('select[data-qa="months"]').select(userData.birthDate.month);
    cy.get('select[data-qa="years"]').select(userData.birthDate.year);

    if (userData.newsletter) cy.get('input[id="newsletter"]').check();
    if (userData.specialOffers) cy.get('input[id="optin"]').check();

    cy.get('input[data-qa="first_name"]').type(userData.firstName);
    cy.get('input[data-qa="last_name"]').type(userData.lastName);
    cy.get('input[data-qa="company"]').type(userData.company);
    cy.get('input[data-qa="address"]').type(userData.address);
    cy.get('input[data-qa="address2"]').type(userData.address2);
    cy.get('select[data-qa="country"]').select(userData.country);
    cy.get('input[data-qa="state"]').type(userData.state);
    cy.get('input[data-qa="city"]').type(userData.city);
    cy.get('input[data-qa="zipcode"]').type(userData.zipcode);
    cy.get('input[data-qa="mobile_number"]').type(userData.mobileNumber);

    cy.get('button[data-qa="create-account"]').click();
    cy.contains('h2', 'Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();
  },

  assertLoggedInAs(firstName, lastName) {
    cy.contains('a', `Logged in as ${firstName + ' ' + lastName}`).should('be.visible');
  },

  assertLoggedInAsCreatedUser() {
    cy.contains('a', `Logged in as ${createdUser.username}`).should('be.visible');
  },

  assertLoginErrorMessage() {
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
  },

  logoutUserAndAssertLoginPage() {
    cy.contains('a', 'Logout').click();
    cy.contains('h2', 'Login to your account').should('be.visible');
  },

  fillLoginFormWithCreatedUserAndSubmit() {
    cy.get('input[data-qa="login-email"]').type(createdUser.email);
    cy.get('input[data-qa="login-password"]').type(createdUser.password);
    cy.get('button[data-qa="login-button"]').click();
  },

  deleteAccountAndAssertConfirmation() {
    cy.contains('a', 'Delete Account').click();
    cy.contains('h2', 'Account Deleted!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();
  },

  createUserWithSetCredentialsAndRandomInformationAPI (randomUser) {
    const requestBody = {
      name: createdUser.username,
      email: createdUser.email,
      password: createdUser.password,
      title: randomUser.title,
      birth_date: randomUser.birthDate.day,
      birth_month: randomUser.birthDate.month,
      birth_year: randomUser.birthDate.year,
      firstname: randomUser.firstName,
      lastname: randomUser.lastName,
      company: randomUser.company,
      address1: randomUser.address,
      address2: randomUser.address2,
      country: randomUser.country,
      zipcode: randomUser.zipcode,
      state: randomUser.state,
      city: randomUser.city,
      mobile_number: randomUser.mobileNumber,
    };

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      body: requestBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  },

  deleteUserAPIForTeardownNeededScenarios() {
    cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        body: {
          email: createdUser.email,
          password: createdUser.password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
});
