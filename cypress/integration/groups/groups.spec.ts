/// <reference types="cypress" />

export {};
const randomId = String(Math.random()).split('.')[1];
const groupName = `unleash-e2e-${randomId}`;

// Disable all active splash pages by visiting them.
const disableActiveSplashScreens = () => {
    cy.visit(`/splash/operators`);
};

describe('groups', () => {
    before(() => {
        disableActiveSplashScreens();
    });

    beforeEach(() => {
        cy.login();
        cy.visit('/admin/groups');
    });

    it('can create a group', () => {
        if (document.querySelector("[data-testid='CLOSE_SPLASH']")) {
            cy.get("[data-testid='CLOSE_SPLASH']").click();
        }

        cy.get("[data-testid='NAVIGATE_TO_CREATE_GROUP']").click();

        cy.intercept('POST', '/api/admin/groups').as('createGroup');

        cy.get("[data-testid='UG_NAME_ID']").type(groupName);
        cy.get("[data-testid='UG_DESC_ID']").type('hello-world');
        cy.get("[data-testid='UG_USERS_ID']").click();
        cy.get("[type='checkbox']").first().check();
        cy.get("[data-testid='UG_USERS_ADD_ID']").click();
        cy.get("[data-testid='UG_USERS_TABLE_ROLE_ID']").click();
        cy.contains('Owner').click();

        cy.get("[data-testid='UG_CREATE_BTN_ID']").click();
        cy.wait('@createGroup');
        cy.contains(groupName);
    });

    it('gives an error if a group exists with the same name', () => {
        if (document.querySelector("[data-testid='CLOSE_SPLASH']")) {
            cy.get("[data-testid='CLOSE_SPLASH']").click();
        }

        cy.get("[data-testid='NAVIGATE_TO_CREATE_GROUP']").click();

        cy.intercept('POST', '/api/admin/groups').as('createGroup');

        cy.get("[data-testid='UG_NAME_ID']").type(groupName);
        cy.get("[data-testid='UG_DESC_ID']").type('hello-world');
        cy.get("[data-testid='UG_USERS_ID']").click();
        cy.get("[type='checkbox']").first().check();
        cy.get("[data-testid='UG_USERS_ADD_ID']").click();
        cy.get("[data-testid='UG_USERS_TABLE_ROLE_ID']").click();
        cy.contains('Owner').click();

        cy.get("[data-testid='UG_CREATE_BTN_ID']").click();
        cy.get("[data-testid='TOAST_TEXT']").contains(
            'Group name already exists'
        );
    });

    it('gives an error if a group does not have an owner', () => {
        if (document.querySelector("[data-testid='CLOSE_SPLASH']")) {
            cy.get("[data-testid='CLOSE_SPLASH']").click();
        }

        cy.get("[data-testid='NAVIGATE_TO_CREATE_GROUP']").click();

        cy.intercept('POST', '/api/admin/groups').as('createGroup');

        cy.get("[data-testid='UG_NAME_ID']").type(groupName);
        cy.get("[data-testid='UG_DESC_ID']").type('hello-world');
        cy.get("[data-testid='UG_USERS_ID']").click();
        cy.get("[type='checkbox']").first().check();
        cy.get("[data-testid='UG_USERS_ADD_ID']").click();

        cy.get("[data-testid='UG_CREATE_BTN_ID']").click();
        cy.get("[data-testid='TOAST_TEXT']").contains(
            'Group needs to have at least one Owner'
        );
    });
});
