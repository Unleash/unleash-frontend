/* eslint-disable jest/no-conditional-expect */
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

const username = 'test@test.com';
const password = 'qY70$NDcJNXA';

describe('auth', () => {
    it('renders the password login', () => {
        cy.intercept('GET', '/api/admin/user', {
            statusCode: 401,
            body: {
                defaultHidden: false,
                message: 'You must sign in in order to use Unleash',
                options: [],
                path: '/auth/simple/login',
                type: 'password',
            },
        });
        cy.visit('/');

        cy.intercept('POST', '/auth/simple/login', req => {
            expect(req.body.username).to.equal(username);
            expect(req.body.password).to.equal(password);
        }).as('passwordLogin');

        cy.get('[data-test="LOGIN_EMAIL_ID"]').type(username);

        cy.get('[data-test="LOGIN_PASSWORD_ID"]').type(password);

        cy.get("[data-test='LOGIN_BUTTON']").click();
    });

    it('renders does not render password login if defaultHidden is true', () => {
        cy.intercept('GET', '/api/admin/user', {
            statusCode: 401,
            body: {
                defaultHidden: true,
                message: 'You must sign in in order to use Unleash',
                options: [],
                path: '/auth/simple/login',
                type: 'password',
            },
        });
        cy.visit('/');

        cy.get('[data-test="LOGIN_EMAIL_ID"]').should('not.exist');

        cy.get('[data-test="LOGIN_PASSWORD_ID"]').should('not.exist');
    });
});
