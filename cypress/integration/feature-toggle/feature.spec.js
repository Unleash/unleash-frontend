/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

let featureToggleName = '';

describe('example to-do app', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        const passwordAuth = Cypress.env('PASSWORD_AUTH');

        cy.visit('/');

        if (passwordAuth) {
            cy.get('[data-test="LOGIN_EMAIL_ID"]').type('test@test.com');

            cy.get('[data-test="LOGIN_PASSWORD_ID"]').type('qY70$NDcJNXA');

            cy.get("[data-test='LOGIN_BUTTON']").click();
            // cy.session("session", () => {
            //     cy.visit('/login');
            //     cy.get('[data-test=LOGIN_EMAIL_ID]').type("test@test.com");
            //     cy.get('[data-test=LOGIN_PASSWORD_ID]').type('qY70$NDcJNXA');
            //     cy.get("[data-test='LOGIN_BUTTON']").click();
            //     cy.url().should('contain', '/features');
            // });
        } else {
            cy.get('[data-test=LOGIN_EMAIL_ID]').type('test@unleash-e2e.com');
            cy.get('[data-test=LOGIN_BUTTON]').click();
        }

        featureToggleName = `unleash-e2e`;
    });

    it('Creates a feature toggle', () => {
        cy.get('[data-test=NAVIGATE_TO_CREATE_FEATURE').click();

        cy.intercept('POST', '/api/admin/features').as('createFeature');

        cy.get("[data-test='CF_NAME_ID'").type(featureToggleName);
        cy.get("[data-test='CF_DESC_ID'").type('hellowrdada');

        cy.get("[data-test='CF_CREATE_BTN_ID']").click();
        cy.wait('@createFeature');
        cy.url().should('include', featureToggleName);
    });

    it('Can add a strategy to the default environment', () => {
        cy.wait(500);
        cy.visit(`/projects/default/features2/${featureToggleName}/strategies`);
        cy.get('[data-test=ADD_NEW_STRATEGY_ID]').click();
    });
});
