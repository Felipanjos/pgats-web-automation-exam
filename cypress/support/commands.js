Cypress.Commands.addAll({
    navigateToSignUpLogin() {
        cy.contains('a', 'Signup / Login').click();
    },
    
    fillSignUpFormAndSubmit(userData) {
        cy.get('input[data-qa="signup-name"]').type(userData.name);
        cy.get('input[data-qa="signup-email"]').type(userData.email);
        cy.get('button[data-qa="signup-button"]').click();
        
        cy.contains('h2', 'Enter Account Information').should('be.visible');
        
        if (userData.gender === 'male') 
            cy.get('input[id="id_gender1"]').check();
         else 
            cy.get('input[id="id_gender2"]').check();
        
        
        cy.get('input[id="password"]').type(userData.password);
        cy.get('select[data-qa="days"]').select(userData.birthDate.day);
        cy.get('select[data-qa="months"]').select(userData.birthDate.month);
        cy.get('select[data-qa="years"]').select(userData.birthDate.year);
        
        if (userData.newsletter)
            cy.get('input[id="newsletter"]').check();
        if (userData.specialOffers) 
            cy.get('input[id="optin"]').check();

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
        cy.contains('a', `Logged in as ${userData.firstName + ' ' + userData.lastName}`).should('be.visible');
    },

    deleteAccountAndAssertConfirmation() {
        cy.contains('a', 'Delete Account').click();
        cy.contains('h2', 'Account Deleted!').should('be.visible');
    }
});
